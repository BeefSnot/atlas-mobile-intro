type GeminiCandidate = {
  content?: {
    parts?: Array<{ text?: string }>;
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

const DEFAULT_MODEL = 'gemini-2.5-pro';

function buildPrompt(userPrompt: string) {
  return [
    'You are a gluten-free recipe assistant.',
    'Prioritize allergy safety and clear, practical cooking steps.',
    'Keep responses concise and actionable.',
    '',
    `User request: ${userPrompt}`,
  ].join('\n');
}

function extractGeminiText(data: GeminiResponse) {
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  return parts
    .map((part) => part.text?.trim())
    .filter((text): text is string => Boolean(text))
    .join('\n')
    .trim();
}

export async function askRecipeAssistant(userPrompt: string) {
  const endpoint = process.env.EXPO_PUBLIC_AI_ENDPOINT?.trim();

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      throw new Error(`AI endpoint failed (${response.status})`);
    }

    const payload = (await response.json()) as {
      answer?: string;
      text?: string;
      content?: string;
    };

    const answer = payload.answer ?? payload.text ?? payload.content;
    if (!answer) {
      throw new Error('AI endpoint returned no answer text.');
    }

    return answer;
  }

  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'Missing EXPO_PUBLIC_GEMINI_API_KEY. Add it to a .env file for local Expo testing.'
    );
  }

  const model = process.env.EXPO_PUBLIC_GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(userPrompt) }] }],
      generationConfig: {
        temperature: 0.6,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status})`);
  }

  const data = (await response.json()) as GeminiResponse;
  const text = extractGeminiText(data);

  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  return text;
}