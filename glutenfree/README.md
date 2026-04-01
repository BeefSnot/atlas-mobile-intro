# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Gluten-free experience

This workspace now powers **SafeSpoon**, a chef-style gluten-free recipe book focused on allergen safety and FODMAP-friendly cooking.

- **Interactive filters** – toggle individual allergens (corn, fish, meat, nuts, tree nuts, peanuts, etc.) and choose a FODMAP focus to instantly refine the library.
- **Curated data** – every recipe is hand-written with ingredients, steps, nourishment highlights, and allergen notes stored in `constants/recipes.ts`.
- **Detail views** – tap any card to open a full-screen recipe with share links, spotlight tips, and nutrition macros.
- **Flavor studio tab** – plan by cooking mood, track pantry staples, and skim chef techniques for gluten-free texture.

Run `npm run lint` to keep the TypeScript and Expo Router structure healthy, then `npx expo start` to preview the mobile experience.

## AI recipe helper (Gemini)

The Explore tab includes an **AI recipe helper** panel.

For local Expo testing, create a `.env` file in `glutenfree/` with:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
# optional legacy single model setting
EXPO_PUBLIC_GEMINI_MODEL=gemini-2.5-pro
# optional dual-model strategy (preferred)
EXPO_PUBLIC_GEMINI_PRIMARY_MODEL=gemini-2.5-pro
EXPO_PUBLIC_GEMINI_SECONDARY_MODEL=gemini-2.0-flash
```

If you want to route through your backend (recommended for production/Vercel), set:

```bash
EXPO_PUBLIC_AI_ENDPOINT=https://your-api.example.com/api/recipe-assistant
```

When `EXPO_PUBLIC_AI_ENDPOINT` is set, the app uses that endpoint instead of calling Gemini directly.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
