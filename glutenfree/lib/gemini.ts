const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

function buildModelChain() {
  const primaryModel = process.env.EXPO_PUBLIC_GEMINI_PRIMARY_MODEL?.trim();
  const legacyModel = process.env.EXPO_PUBLIC_GEMINI_MODEL?.trim();
  const secondaryModel = process.env.EXPO_PUBLIC_GEMINI_SECONDARY_MODEL?.trim();

  const defaults = ['gemini-2.5-flash', 'gemini-2.5-pro'];

  return [primaryModel, legacyModel, secondaryModel, ...defaults]
    .filter((value): value is string => Boolean(value))
    .filter((value, index, array) => array.indexOf(value) === index);
}

export type RecipeHelperRequest = {
  userPrompt: string;
  pantryItems: string[];
  recipeCatalogContext?: string;
};

export type RecipeHelpResult = {
  text: string;
  modelUsed: string;
};

type GeminiErrorResponse = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function getFriendlyGeminiError(status: number, payloadText: string) {
  try {
    const payload = JSON.parse(payloadText) as GeminiErrorResponse;
    const message = payload.error?.message ?? payloadText;

    if (status === 429) {
      if (message.includes('Quota exceeded')) {
        return 'Gemini quota reached for this model. Try again shortly or switch to a lower-cost model (for example: EXPO_PUBLIC_GEMINI_MODEL=gemini-2.0-flash).';
      }
      return 'Too many AI requests right now. Please wait a bit and try again.';
    }

    return `Gemini request failed (${status}): ${message}`;
  } catch {
    if (status === 429) {
      return 'Too many AI requests right now. Please wait a bit and try again.';
    }

    return `Gemini request failed (${status})`;
  }
}

async function requestGemini(model: string, prompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const payloadText = await res.text();
    return {
      ok: false as const,
      status: res.status,
      payloadText,
      message: getFriendlyGeminiError(res.status, payloadText),
    };
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((p: { text?: string }) => p.text || '').join('\n').trim();

  return {
    ok: true as const,
    text,
  };
}

export async function askGemini(prompt: string): Promise<string> {
  const result = await askGeminiDetailed(prompt);
  return result.text;
}

export async function askGeminiDetailed(prompt: string): Promise<RecipeHelpResult> {
  if (!API_KEY) throw new Error('Missing EXPO_PUBLIC_GEMINI_API_KEY');

  const modelsToTry = buildModelChain();
  let lastFailureMessage = 'AI request failed';

  for (const model of modelsToTry) {
    const result = await requestGemini(model, prompt);

    if (result.ok && result.text) {
      return {
        text: result.text,
        modelUsed: model,
      };
    }

    if (!result.ok) {
      lastFailureMessage = result.message;
      if (result.status !== 429) {
        break;
      }
    }
  }

  throw new Error(lastFailureMessage);
}

export async function getRecipeHelp(request: RecipeHelperRequest): Promise<RecipeHelpResult> {
  const prompt = `
You are a gluten-free recipe curator and substitution assistant.

You are an expert gluten-free culinary assistant operating inside the SafeSpoon app. Prefer suggesting exact recipes from the in-app catalog when relevant.

You help users cook amazing gluten-free meals with what they have, figure out substitutions, and find recipes.

When the user asks a question, answer it clearly and practically. Prefer suggesting exact recipes from the in-app catalog when relevant. Keep your tone encouraging but concise.

IMPORTANT DIRECTIVES FOR FORMATTING:
Create a highly scannable response. Use bold text for key terms.
Structure your response so it falls into clean UI cards. You MUST use this exact numbering pattern for headers (feel free to adapt the header title, but it MUST start with "1) ", "2) ", etc.):

1) Best-fit meal ideas
  - Idea 1
  - Idea 2
2) Pantry-first substitutions
  - Highlight swaps
3) Chef's tip
  - One quick pro-tip

User's Request: ${request.userPrompt}
User's currently selected pantry items: ${request.pantryItems.join(', ') || 'None selected'}

In-app recipe catalog context (for reference only):
${request.recipeCatalogContext || 'None'}
`;

  return await askGeminiDetailed(prompt);
}