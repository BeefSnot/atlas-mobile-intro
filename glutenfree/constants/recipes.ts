export type Allergen =
  | 'corn'
  | 'fish'
  | 'nuts'
  | 'treeNuts'
  | 'peanuts'
  | 'soy'
  | 'eggs'
  | 'dairy'
  | 'sesame'
  | 'shellfish';

export type FodmapLevel = 'low' | 'moderate' | 'high';
export type Mood = 'comfort' | 'refreshing' | 'adventurous';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
export type ProteinKey = 'chicken' | 'beef' | 'lamb' | 'pork' | 'fish' | 'shellfish' | 'plant';

export interface IngredientSection {
  title: string;
  items: string[];
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'easy' | 'medium' | 'ambitious';
  totalTime: number; // minutes
  prepTime: number; // minutes
  rating: number; // 0-5
  serves: number;
  proteins: ProteinKey[];
  allergens: Allergen[];
  fodmap: FodmapLevel;
  fodmapNotes: string;
  heroGradient: [string, string, ...string[]];
  mealType: MealType;
  tags: string[];
  moods: Mood[];
  ingredients: IngredientSection[];
  steps: string[];
  spotlightTips: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export const allergensList: {
  key: Allergen;
  label: string;
  icon: string;
}[] = [
  { key: 'corn', label: 'Corn', icon: 'corn' },
  { key: 'fish', label: 'Fish', icon: 'fish' },
  { key: 'nuts', label: 'Nuts', icon: 'peanut-outline' },
  { key: 'treeNuts', label: 'Tree Nuts', icon: 'pine-tree' },
  { key: 'peanuts', label: 'Peanuts', icon: 'peanut' },
  { key: 'soy', label: 'Soy', icon: 'sprout' },
  { key: 'eggs', label: 'Eggs', icon: 'egg-outline' },
  { key: 'dairy', label: 'Dairy', icon: 'cow' },
  { key: 'sesame', label: 'Sesame', icon: 'grain' },
  { key: 'shellfish', label: 'Shellfish', icon: 'shrimp' },
];

export const proteinFilters: {
  key: ProteinKey;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    key: 'chicken',
    label: 'Chicken',
    icon: 'food-drumstick',
    description: 'Roasted thighs, poached breasts, skewers.',
  },
  {
    key: 'beef',
    label: 'Beef',
    icon: 'cow',
    description: 'Skirt steak, short ribs, tamari sears.',
  },
  {
    key: 'lamb',
    label: 'Lamb',
    icon: 'sheep',
    description: 'Kofta, chops, fragrant braises.',
  },
  {
    key: 'pork',
    label: 'Pork',
    icon: 'pig-variant',
    description: 'Charred skewers, caramelized roasts.',
  },
  {
    key: 'fish',
    label: 'Fish',
    icon: 'fish',
    description: 'Salmon, cod, swordfish packets.',
  },
  {
    key: 'shellfish',
    label: 'Shellfish',
    icon: 'shrimp',
    description: 'Shrimp, scallops, crab cakes.',
  },
  {
    key: 'plant',
    label: 'Plant-based',
    icon: 'leaf',
    description: 'Legumes, tofu, halloumi, grains.',
  },
];

export type FodmapFilterKey = 'any' | 'low' | 'gentle';

export const fodmapFilters: {
  key: FodmapFilterKey;
  label: string;
  description: string;
}[] = [
  { key: 'any', label: 'All recipes', description: 'Show every curated recipe' },
  { key: 'low', label: 'Low FODMAP', description: 'Strictly low-FODMAP friendly' },
  {
    key: 'gentle',
    label: 'Gentle FODMAP',
    description: 'Low + moderate swaps ideal for reintroduction',
  },
];

export const recipes: Recipe[] = [
  {
    id: 'citrus-herb-market-bowl',
    title: 'Citrus Herb Market Bowl',
    subtitle: 'Quinoa, shaved fennel, charred broccolini, and citrus vinaigrette',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 20,
    rating: 4.9,
    serves: 2,
    proteins: ['plant'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Sweet potato is portioned to stay low-FODMAP and garlic is swapped for infused oil.',
    heroGradient: ['#53d6c5', '#2d8a91'],
    mealType: 'lunch',
    tags: ['meal prep', 'plant-forward', 'high fiber'],
    moods: ['refreshing', 'adventurous'],
    ingredients: [
      {
        title: 'Produce',
        items: ['1 cup broccolini, stems trimmed', '1 small fennel bulb, shaved', '1 cup baby arugula', '1 small sweet potato, diced']
      },
      {
        title: 'Grains & protein',
        items: ['3/4 cup tri-color quinoa', '1/2 cup canned chickpeas, rinsed', '2 tbsp toasted pumpkin seeds']
      },
      {
        title: 'Citrus vinaigrette',
        items: ['2 tbsp orange juice', '1 tbsp lemon juice', '2 tbsp garlic-infused olive oil', '1 tsp maple syrup', '1 tsp Dijon mustard']
      }
    ],
    steps: [
      'Simmer quinoa in lightly salted water until fluffy, about 15 minutes. Spread on a tray to cool.',
      'Roast sweet potato cubes and broccolini at 425°F (220°C) until caramelized, 12-15 minutes.',
      'Shave fennel paper thin and soak in ice water for crispness.',
      'Shake vinaigrette ingredients in a jar until glossy and emulsified.',
      'Toss everything with arugula, chickpeas, and pumpkin seeds. Finish with citrus zest and flaky salt.'
    ],
    spotlightTips: [
      'Use orange zest in the dressing for a perfumed finish.',
      'Meal prep friendly—store dressing separately and toss right before serving.'
    ],
    nutrition: { calories: 520, protein: 18, carbs: 68, fat: 18, fiber: 11 },
  },
  {
    id: 'coconut-lime-cod-packets',
    title: 'Coconut-Lime Cod Packets',
    subtitle: 'Steamed in parchment with baby bok choy and herb oil',
    difficulty: 'easy',
    totalTime: 25,
    prepTime: 15,
    rating: 4.8,
    serves: 2,
    proteins: ['fish'],
    allergens: ['fish'],
    fodmap: 'low',
    fodmapNotes: 'Coconut milk is limited to 1/4 cup per serving to stay FODMAP-friendly.',
    heroGradient: ['#f8c390', '#f6b19a'],
    mealType: 'dinner',
    tags: ['one-pan', 'protein-rich'],
    moods: ['refreshing'],
    ingredients: [
      { title: 'Base', items: ['2 5-oz cod fillets', '2 baby bok choy, halved', '1 cup julienned carrots', '1/2 cup thinly sliced zucchini'] },
      { title: 'Sauce', items: ['1/2 cup light coconut milk', '1 tbsp lime juice + zest', '1 tsp grated ginger', '1 tbsp garlic-infused oil', '1 tsp fish sauce or tamari'] }
    ],
    steps: [
      'Heat oven to 400°F (205°C). Layer vegetables onto parchment squares.',
      'Place cod on top, season with salt and white pepper.',
      'Whisk coconut milk, lime, ginger, infused oil, and fish sauce. Spoon over fish.',
      'Fold parchment into sealed packets and bake on a sheet tray for 12 minutes.',
      'Unwrap at the table, shower with herbs, and serve with warm rice.'
    ],
    spotlightTips: ['Add kaffir lime leaf strips inside the packet for spa-level aroma.'],
    nutrition: { calories: 380, protein: 34, carbs: 16, fat: 20, fiber: 3 },
  },
  {
    id: 'smoky-cauliflower-tacos',
    title: 'Smoky Cauliflower Tacos',
    subtitle: 'Chipotle-roasted florets with pickled cabbage and avocado crema',
    difficulty: 'medium',
    totalTime: 40,
    prepTime: 20,
    rating: 4.7,
    serves: 4,
    proteins: ['plant'],
    allergens: ['nuts'],
    fodmap: 'moderate',
    fodmapNotes: 'Cashew crema pushes this into moderate territory—swap with lactose-free yogurt for low FODMAP.',
    heroGradient: ['#f27a7d', '#e24175'],
    mealType: 'dinner',
    tags: ['taco night', 'party'],
    moods: ['adventurous', 'comfort'],
    ingredients: [
      { title: 'Roast', items: ['1 large cauliflower, florets torn', '2 tsp chipotle chili powder', '1 tsp smoked paprika', '2 tbsp avocado oil', 'Salt & pepper'] },
      { title: 'Pickled cabbage', items: ['1 cup shredded red cabbage', '2 tbsp rice vinegar', '1 tsp maple syrup', 'Pinch salt'] },
      { title: 'Cashew crema', items: ['1/2 cup soaked cashews', '1/4 cup water', '2 tbsp lime juice', '1 tbsp garlic-infused oil'] },
      { title: 'To serve', items: ['8 small cassava tortillas', 'Sliced avocado', 'Fresh cilantro', 'Radish matchsticks'] }
    ],
    steps: [
      'Roast cauliflower at 425°F (220°C) until deeply charred, tossing once.',
      'Massage cabbage with vinegar, maple, and salt; let it quick pickle.',
      'Blend soaked cashews with lime, water, and infused oil until silky.',
      'Char tortillas over an open flame or a dry skillet.',
      'Layer tortillas with cauliflower, cabbage, avocado, and crema. Shower with cilantro.'
    ],
    spotlightTips: ['Bake an extra tray of cauliflower and freeze for weekday tacos.'],
    nutrition: { calories: 410, protein: 11, carbs: 46, fat: 20, fiber: 8 },
  },
  {
    id: 'maple-tahini-granola',
    title: 'Maple Tahini Granola Clusters',
    subtitle: 'Crunchy quinoa flakes, coconut chips, and sesame drizzle',
    difficulty: 'easy',
    totalTime: 30,
    prepTime: 10,
    rating: 4.9,
    serves: 10,
    proteins: ['plant'],
    allergens: ['sesame', 'treeNuts'],
    fodmap: 'moderate',
    fodmapNotes: 'Dates add gentle sweetness—swap for blueberries if you need low FODMAP.',
    heroGradient: ['#f7d28c', '#f3a953'],
    mealType: 'snack',
    tags: ['batch cooking', 'breakfast top'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Dry mix', items: ['3 cups certified GF rolled oats', '1 cup puffed quinoa', '1 cup coconut chips', '1/2 cup sliced almonds', '2 tbsp chia seeds'] },
      { title: 'Wet mix', items: ['1/3 cup tahini', '1/3 cup maple syrup', '1/4 cup olive oil', '1 tsp cinnamon', 'Pinch flaky salt'] }
    ],
    steps: [
      'Heat oven to 325°F (165°C). Line a sheet tray with parchment.',
      'Whisk tahini, maple, olive oil, cinnamon, and salt until glossy.',
      'Fold in dry ingredients and compress mixture onto tray.',
      'Bake 18-20 minutes, rotating once, until edges are deeply golden.',
      'Cool completely, then break into clusters and drizzle with extra tahini.'
    ],
    spotlightTips: ['Store in a glass jar to keep the clusters ultra crisp for two weeks.'],
    nutrition: { calories: 220, protein: 6, carbs: 24, fat: 11, fiber: 4 },
  },
  {
    id: 'lemon-ricotta-hotcakes',
    title: 'Lemon Ricotta Hotcakes',
    subtitle: 'Fluffy almond-flour cakes with macerated berries',
    difficulty: 'medium',
    totalTime: 30,
    prepTime: 15,
    rating: 4.6,
    serves: 4,
    proteins: ['plant'],
    allergens: ['treeNuts', 'eggs', 'dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Ricotta keeps these indulgent—swap lactose-free cottage cheese if needed.',
    heroGradient: ['#ffd89c', '#ffc3a0'],
    mealType: 'breakfast',
    tags: ['brunch', 'treat'],
    moods: ['comfort', 'refreshing'],
    ingredients: [
      { title: 'Batter', items: ['1 cup superfine almond flour', '1/4 cup tapioca starch', '1 tsp baking powder', '3 eggs, separated', '1 cup ricotta', 'Zest of 1 lemon', '2 tbsp maple syrup'] },
      { title: 'Topping', items: ['1 cup strawberries, sliced', '1 cup blueberries', '1 tsp lemon juice', '1 tsp maple syrup'] }
    ],
    steps: [
      'Whisk yolks with ricotta, lemon zest, maple, and dry ingredients.',
      'Beat egg whites to soft peaks and fold gently into batter.',
      'Cook 1/4-cup scoops on a medium skillet until puffed and golden.',
      'Toss berries with lemon juice and maple, then spoon over hotcakes.'
    ],
    spotlightTips: ['Fold in chia seeds for extra structure if you plan to meal prep.'],
    nutrition: { calories: 320, protein: 14, carbs: 22, fat: 20, fiber: 4 },
  },
  {
    id: 'ginger-miso-soba',
    title: 'Ginger Miso Soba Bowls',
    subtitle: 'Roasted mushrooms, blistered snap peas, soft egg, and toasty broth',
    difficulty: 'ambitious',
    totalTime: 45,
    prepTime: 25,
    rating: 4.8,
    serves: 3,
    proteins: ['plant'],
    allergens: ['soy', 'eggs'],
    fodmap: 'moderate',
    fodmapNotes: 'White miso and tamari are portioned for moderate FODMAP comfort.',
    heroGradient: ['#6a85b6', '#bac8e0'],
    mealType: 'dinner',
    tags: ['cozy', 'umami'],
    moods: ['comfort', 'adventurous'],
    ingredients: [
      { title: 'Broth', items: ['4 cups low-sodium veggie broth', '1 tbsp white miso', '1 tbsp tamari', '1" ginger, sliced', '1 tsp toasted sesame oil'] },
      { title: 'Toppings', items: ['6 oz 100% buckwheat soba', '2 cups cremini mushrooms', '1 cup snap peas', '3 soft-boiled eggs', 'Sheets of toasted nori'] }
    ],
    steps: [
      'Roast mushrooms at 400°F (205°C) with sesame oil until crisp.',
      'Blister snap peas quickly in a hot pan with a touch of tamari.',
      'Simmer broth with ginger, miso, and tamari; keep just below a boil.',
      'Cook soba separately, rinse under cool water to remove extra starch.',
      'Assemble bowls with noodles, vegetables, halved eggs, and ladle broth over top.'
    ],
    spotlightTips: ['Finish with chili crisp or black sesame for texture.'],
    nutrition: { calories: 390, protein: 17, carbs: 50, fat: 12, fiber: 6 },
  },
  {
    id: 'charred-citrus-chicken',
    title: 'Charred Citrus Chicken Grain Bowl',
    subtitle: 'Sumac chicken thighs, pickled shallot, herbs, and millet',
    difficulty: 'medium',
    totalTime: 40,
    prepTime: 20,
    rating: 4.8,
    serves: 4,
    proteins: ['chicken'],
    allergens: ['sesame'],
    fodmap: 'moderate',
    fodmapNotes: 'Shallots are quick-pickled and portioned to 1 tbsp per serving for moderate comfort.',
    heroGradient: ['#f9c58d', '#f5886c'],
    mealType: 'dinner',
    tags: ['meal prep', 'bright'],
    moods: ['refreshing', 'comfort'],
    ingredients: [
      {
        title: 'Protein',
        items: ['4 boneless chicken thighs', '1 tbsp sumac', '1 tbsp olive oil', '1 tsp smoked salt'],
      },
      {
        title: 'Grain bowl',
        items: ['2 cups cooked millet', '1 cup shaved cucumber', '1/4 cup pickled shallot', '1 cup baby herbs and microgreens'],
      },
      {
        title: 'Tahini citrus dressing',
        items: ['3 tbsp tahini', '2 tbsp orange juice', '1 tbsp lemon juice', '2 tbsp warm water', '1 tsp maple syrup', '1 tsp toasted sesame oil'],
      },
    ],
    steps: [
      'Massage chicken with sumac, oil, and smoked salt. Grill or sear until charred and juicy.',
      'Fluff warm millet and fold in cucumber plus herbs.',
      'Whisk dressing until glossy, thinning with warm water as needed.',
      'Slice chicken, arrange over bowls, spoon on pickled shallot, and drizzle dressing.',
    ],
    spotlightTips: [
      'Char a halved lemon alongside the chicken for smoky acidity.',
      'Store components separately for a ready-to-assemble lunch kit.',
    ],
    nutrition: { calories: 540, protein: 38, carbs: 52, fat: 18, fiber: 6 },
  },
  {
    id: 'black-garlic-beef-cups',
    title: 'Black Garlic Beef Lettuce Cups',
    subtitle: 'Tamari-seared flank, pickled cucumber, and chili crunch',
    difficulty: 'medium',
    totalTime: 30,
    prepTime: 15,
    rating: 4.7,
    serves: 4,
    proteins: ['beef'],
    allergens: ['soy'],
    fodmap: 'moderate',
    fodmapNotes: 'Use the green parts of scallions only and keep black garlic paste to 1 tsp per serving.',
    heroGradient: ['#fd746c', '#ff9068'],
    mealType: 'dinner',
    tags: ['party', 'low carb'],
    moods: ['adventurous'],
    ingredients: [
      {
        title: 'Beef',
        items: ['1 lb flank steak, thinly sliced', '1 tbsp tamari', '1 tsp black garlic paste', '1 tsp avocado oil'],
      },
      {
        title: 'Pickles + toppings',
        items: ['1 cup cucumber matchsticks', '2 tbsp rice vinegar', '1 tsp maple syrup', 'Butter lettuce cups', 'Herbs and chili crisp'],
      },
    ],
    steps: [
      'Marinate beef with tamari, black garlic, and oil for 10 minutes.',
      'Quick pickle cucumber with vinegar and maple syrup.',
      'Sear beef over high heat until caramelized edges form.',
      'Spoon beef into lettuce leaves, top with pickles, herbs, and chili crisp.',
    ],
    spotlightTips: [
      'Flash-freeze steak for 10 minutes to make razor-thin slices.',
      'Serve with chilled rice noodles if you need extra carbs on the plate.',
    ],
    nutrition: { calories: 420, protein: 33, carbs: 18, fat: 24, fiber: 2 },
  },
  {
    id: 'smoked-lamb-meatballs',
    title: 'Smoked Paprika Lamb Meatballs',
    subtitle: 'Herbed polenta, preserved lemon gremolata, roasted tomatoes',
    difficulty: 'ambitious',
    totalTime: 50,
    prepTime: 25,
    rating: 4.9,
    serves: 4,
    proteins: ['lamb'],
    allergens: ['dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Use lactose-free milk in the polenta to keep portions gentle.',
    heroGradient: ['#f7b267', '#e94f37'],
    mealType: 'dinner',
    tags: ['date night', 'comfort'],
    moods: ['comfort', 'adventurous'],
    ingredients: [
      {
        title: 'Meatballs',
        items: ['1 lb ground lamb', '2 tsp smoked paprika', '1 tsp ground cumin', '2 tbsp minced parsley', '1 egg', 'Salt and pepper'],
      },
      {
        title: 'Polenta',
        items: ['1 cup fine cornmeal', '3 cups low-sodium broth', '1 cup lactose-free milk', '2 tbsp olive oil'],
      },
      {
        title: 'Gremolata',
        items: ['2 tbsp minced parsley', '1 tbsp preserved lemon peel, minced', '1 tsp olive oil'],
      },
    ],
    steps: [
      'Combine lamb mixture, roll into 16 meatballs, and roast at 425°F (220°C) until browned.',
      'Whisk cornmeal into simmering broth and milk, stirring until creamy.',
      'Toss roasted cherry tomatoes with olive oil and broil until blistered.',
      'Plate polenta, nestle meatballs, top with tomatoes and gremolata.',
    ],
    spotlightTips: [
      'Grate a little lemon zest over the meatballs right before serving for brightness.',
      'Hold finished polenta over the lowest heat with a splash of broth to keep it loose.',
    ],
    nutrition: { calories: 610, protein: 32, carbs: 55, fat: 28, fiber: 4 },
  },
  {
    id: 'coconut-pineapple-pork',
    title: 'Caramelized Pork + Pineapple Skewers',
    subtitle: 'Coconut sugar glaze, charred scallion salsa, limey greens',
    difficulty: 'medium',
    totalTime: 35,
    prepTime: 20,
    rating: 4.7,
    serves: 4,
    proteins: ['pork'],
    allergens: ['soy'],
    fodmap: 'low',
    fodmapNotes: 'Use tamari infused with scallion tops only and limit coconut sugar glaze to 2 tbsp per serving.',
    heroGradient: ['#fddb92', '#d1fdff'],
    mealType: 'dinner',
    tags: ['grill', 'party'],
    moods: ['adventurous'],
    ingredients: [
      {
        title: 'Skewers',
        items: ['1 1/2 lbs pork shoulder, cubed', '2 cups pineapple chunks', '1 tbsp coconut sugar', '2 tbsp tamari', '1 tbsp lime juice'],
      },
      {
        title: 'Scallion salsa',
        items: ['4 scallion greens, charred and chopped', '1 serrano, minced', '2 tbsp olive oil', '1 tbsp rice vinegar'],
      },
      {
        title: 'To serve',
        items: ['Butter lettuce leaves', 'Thinly sliced radish', 'Lime wedges'],
      },
    ],
    steps: [
      'Marinate pork in coconut sugar, tamari, and lime for at least 15 minutes.',
      'Thread pork with pineapple on soaked skewers.',
      'Grill or broil, glazing with remaining marinade until caramelized.',
      'Serve with charred scallion salsa, lettuce leaves, and crunchy radish.',
    ],
    spotlightTips: [
      'Freeze pineapple for 10 minutes so it grills without over-softening.',
      'Reserve a little glaze to brush on right before serving for shine.',
    ],
    nutrition: { calories: 480, protein: 36, carbs: 32, fat: 20, fiber: 3 },
  },
  {
    id: 'cedar-miso-salmon',
    title: 'Cedar Miso Salmon',
    subtitle: 'Roasted asparagus, sesame citrus glaze, toasted nori dust',
    difficulty: 'medium',
    totalTime: 30,
    prepTime: 15,
    rating: 4.9,
    serves: 4,
    proteins: ['fish'],
    allergens: ['fish', 'sesame', 'soy'],
    fodmap: 'moderate',
    fodmapNotes: 'White miso stays within 1 tbsp per serving and green onions are limited to the tops.',
    heroGradient: ['#89f7fe', '#66a6ff'],
    mealType: 'dinner',
    tags: ['sheet pan', 'omega-3'],
    moods: ['refreshing'],
    ingredients: [
      {
        title: 'Salmon',
        items: ['4 salmon fillets', '2 cedar planks soaked 1 hour', 'Salt and pepper'],
      },
      {
        title: 'Glaze',
        items: ['2 tbsp white miso', '1 tbsp maple syrup', '1 tbsp orange juice', '1 tsp sesame oil'],
      },
      {
        title: 'Tray partners',
        items: ['1 bunch asparagus', '1 tbsp olive oil', '1 tsp toasted nori, crumbled'],
      },
    ],
    steps: [
      'Heat grill to medium-high or oven to 400°F (205°C).',
      'Pat salmon dry, season, and place on soaked cedar planks.',
      'Roast asparagus alongside until crisp tender.',
      'Brush salmon with miso glaze during the last 5 minutes and finish with nori dust.',
    ],
    spotlightTips: [
      'Brush cedar planks with oil to prevent sticking.',
      'Add orange zest to the glaze for extra perfume.',
    ],
    nutrition: { calories: 510, protein: 36, carbs: 18, fat: 32, fiber: 4 },
  },
  {
    id: 'gochujang-sesame-shrimp',
    title: 'Gochujang Sesame Shrimp Noodles',
    subtitle: 'Glass noodles, snap pea slaw, chili crunch finish',
    difficulty: 'medium',
    totalTime: 25,
    prepTime: 15,
    rating: 4.6,
    serves: 4,
    proteins: ['shellfish'],
    allergens: ['shellfish', 'sesame', 'soy'],
    fodmap: 'moderate',
    fodmapNotes: 'Use garlic-infused oil instead of minced garlic and limit gochujang to 2 tsp per serving.',
    heroGradient: ['#f8b500', '#fceabb'],
    mealType: 'dinner',
    tags: ['weeknight', 'noodles'],
    moods: ['adventurous', 'comfort'],
    ingredients: [
      {
        title: 'Shrimp',
        items: ['1 lb large shrimp, peeled', '1 tbsp gochujang', '1 tbsp garlic-infused oil', '1 tsp tamari'],
      },
      {
        title: 'Noodles + veg',
        items: ['8 oz glass noodles', '2 cups snap peas, julienned', '1 cup shredded carrot', '1/4 cup scallion greens'],
      },
      {
        title: 'Sauce',
        items: ['2 tbsp lime juice', '1 tbsp sesame oil', '1 tsp honey', '1 tsp chili crisp'],
      },
    ],
    steps: [
      'Soak glass noodles in hot water until pliable, then rinse.',
      'Stir-fry shrimp with gochujang mixture until just opaque.',
      'Toss noodles with snap peas, carrot, and sauce.',
      'Top bowls with shrimp, scallion greens, and chili crisp.',
    ],
    spotlightTips: [
      'Chill the noodles for a cold salad vibe during warmer months.',
      'Swap shrimp for scallops and reduce cook time to keep them tender.',
    ],
    nutrition: { calories: 460, protein: 30, carbs: 54, fat: 14, fiber: 5 },
  },
  {
    id: 'turmeric-tofu-ramen',
    title: 'Golden Turmeric Tofu Ramen',
    subtitle: 'Coconut broth, charred greens, crispy shallot oil',
    difficulty: 'ambitious',
    totalTime: 40,
    prepTime: 20,
    rating: 4.8,
    serves: 4,
    proteins: ['plant'],
    allergens: ['soy'],
    fodmap: 'moderate',
    fodmapNotes: 'Use only the green tops of scallions and limit coconut milk to 1/3 cup per serving.',
    heroGradient: ['#f6e58d', '#f9ca24'],
    mealType: 'dinner',
    tags: ['brothy', 'comfort'],
    moods: ['comfort'],
    ingredients: [
      {
        title: 'Broth',
        items: ['1 tbsp turmeric paste', '1 tbsp ginger, grated', '3 cups vegetable broth', '1 cup light coconut milk', '1 tbsp tamari'],
      },
      {
        title: 'Toppings',
        items: ['8 oz rice ramen', '1 block firm tofu, crisped', '2 cups baby bok choy', 'Crispy shallot oil'],
      },
    ],
    steps: [
      'Sear tofu cubes until golden and crisp on all sides.',
      'Bloom turmeric paste and ginger in a pot, then whisk in broth, coconut milk, and tamari.',
      'Char bok choy quickly in a skillet until bright green.',
      'Cook ramen separately, then build bowls with noodles, bok choy, tofu, and broth.',
    ],
    spotlightTips: [
      'Blend a ladle of broth with tofu scraps for a thicker base.',
      'Add lime juice at the end to keep turmeric flavor lively.',
    ],
    nutrition: { calories: 520, protein: 24, carbs: 58, fat: 20, fiber: 5 },
  },
  {
    id: 'roasted-beet-halloumi',
    title: 'Roasted Beet + Citrus Halloumi',
    subtitle: 'Blood orange, pistachio dukkah, baby kale',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 15,
    rating: 4.5,
    serves: 4,
    proteins: ['plant'],
    allergens: ['treeNuts', 'dairy', 'sesame'],
    fodmap: 'low',
    fodmapNotes: 'Roasted beets and citrus segments keep fodmaps low while halloumi adds richness.',
    heroGradient: ['#c471f5', '#fa71cd'],
    mealType: 'lunch',
    tags: ['salad', 'brunch'],
    moods: ['refreshing'],
    ingredients: [
      {
        title: 'Salad',
        items: ['3 roasted beets, wedged', '2 blood oranges, segmented', '4 cups baby kale', '1/4 cup pickled red onion'],
      },
      {
        title: 'Halloumi + dukkah',
        items: ['8 oz halloumi, sliced', '2 tbsp pistachios, crushed', '1 tsp sesame seeds', '1/2 tsp cumin'],
      },
      {
        title: 'Citrus vinaigrette',
        items: ['2 tbsp lemon juice', '1 tsp maple syrup', '3 tbsp olive oil', 'Pinch salt'],
      },
    ],
    steps: [
      'Sear halloumi slices in a dry skillet until blistered.',
      'Whisk vinaigrette until emulsified.',
      'Toss kale with dressing, then fold in beets and citrus.',
      'Top with halloumi and pistachio dukkah.',
    ],
    spotlightTips: [
      'Roast beets in advance and chill for a crisp bite.',
      'Use golden beets if you want less color transfer.',
    ],
    nutrition: { calories: 410, protein: 17, carbs: 32, fat: 24, fiber: 6 },
  },
  {
    id: 'chimichurri-steak-bowls',
    title: 'Chimichurri Steak Bowls',
    subtitle: 'Charred poblanos, lime rice, pickled radish',
    difficulty: 'medium',
    totalTime: 35,
    prepTime: 20,
    rating: 4.8,
    serves: 3,
    proteins: ['beef'],
    allergens: [],
    fodmap: 'moderate',
    fodmapNotes: 'Chimichurri relies on scallion greens and garlic-infused oil for FODMAP-friendly punch.',
    heroGradient: ['#4facfe', '#00f2fe'],
    mealType: 'dinner',
    tags: ['bowls', 'grill'],
    moods: ['adventurous', 'comfort'],
    ingredients: [
      {
        title: 'Steak',
        items: ['1 lb skirt steak', '1 tbsp garlic-infused olive oil', '1 tsp smoked paprika', 'Salt and pepper'],
      },
      {
        title: 'Chimichurri',
        items: ['1 cup parsley', '1/4 cup cilantro', '1/4 cup scallion greens', '2 tbsp red wine vinegar', '1/3 cup olive oil'],
      },
      {
        title: 'Bowl elements',
        items: ['2 cups lime rice', '1 poblano pepper, charred', 'Pickled radish', 'Micro cilantro'],
      },
    ],
    steps: [
      'Marinate steak with smoked paprika, infused oil, and salt.',
      'Blend chimichurri until spoonable.',
      'Grill steak to medium-rare and char the poblano alongside.',
      'Layer lime rice, sliced steak, poblanos, pickled radish, and drizzle chimichurri.',
    ],
    spotlightTips: [
      'Freeze steak 15 minutes for ultra-thin bias slices.',
      'Add diced avocado if you want extra fats for satiety.',
    ],
    nutrition: { calories: 560, protein: 40, carbs: 48, fat: 22, fiber: 5 },
  },
  {
    id: 'crispy-coconut-chicken',
    title: 'Crispy Coconut Chicken Bites',
    subtitle: 'Air-fried crunch, mango relish, chili-lime yogurt',
    difficulty: 'easy',
    totalTime: 30,
    prepTime: 15,
    rating: 4.6,
    serves: 4,
    proteins: ['chicken'],
    allergens: ['eggs', 'dairy'],
    fodmap: 'low',
    fodmapNotes: 'Mango relish sticks to low-FODMAP fruit and yogurt sauce uses lactose-free yogurt.',
    heroGradient: ['#fbd3e9', '#bb377d'],
    mealType: 'dinner',
    tags: ['air fryer', 'snacky'],
    moods: ['refreshing', 'comfort'],
    ingredients: [
      {
        title: 'Chicken bites',
        items: ['1 1/4 lbs chicken breast, cubed', '2 eggs, whisked', '1 cup shredded coconut', '1/2 cup cassava flour', '1 tsp smoked paprika'],
      },
      {
        title: 'Mango relish',
        items: ['1 cup diced mango', '1/4 cup diced cucumber', '1 tbsp lime juice', 'Mint leaves'],
      },
      {
        title: 'Chili yogurt',
        items: ['1/2 cup lactose-free yogurt', '1 tsp chili powder', '1 tsp lime zest'],
      },
    ],
    steps: [
      'Dredge chicken in cassava flour, dip in egg, and coat with coconut.',
      'Air fry at 400°F (205°C) for 10 to 12 minutes, shaking halfway.',
      'Stir together mango relish ingredients.',
      'Serve chicken with relish and drizzle of chili yogurt.',
    ],
    spotlightTips: [
      'Toast coconut lightly before coating for deeper flavor.',
      'Batch-freeze breaded bites and cook from frozen with 3 extra minutes.',
    ],
    nutrition: { calories: 430, protein: 35, carbs: 32, fat: 18, fiber: 5 },
  },
  {
    id: 'tamarind-chili-chicken',
    title: 'Tamarind Chili Chicken Thighs',
    subtitle: 'Sticky roasted thighs, herby millet, charred citrus',
    difficulty: 'medium',
    totalTime: 45,
    prepTime: 20,
    rating: 4.9,
    serves: 4,
    proteins: ['chicken'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Garlic-infused oil keeps aromatics FODMAP-friendly while tamarind is portioned to 1 tbsp per serving.',
    heroGradient: ['#f9d423', '#ff4e50'],
    mealType: 'dinner',
    tags: ['sheet pan', 'meal prep'],
    moods: ['comfort', 'adventurous'],
    ingredients: [
      {
        title: 'Chicken',
        items: ['6 bone-in chicken thighs', '2 tbsp tamarind paste', '1 tbsp maple syrup', '1 tbsp garlic-infused oil', '1 tsp chili flakes'],
      },
      {
        title: 'Millet',
        items: ['1 cup millet', '2 cups broth', '1 cup chopped herbs', 'Zest of 1 lime'],
      },
      {
        title: 'To serve',
        items: ['Charred lime halves', 'Pickled shallot greens', 'Toasted pepitas'],
      },
    ],
    steps: [
      'Whisk tamarind paste with maple, infused oil, chili flakes, and salt to make a glaze.',
      'Toss thighs in the glaze and roast at 400°F (205°C) until burnished and sticky, about 30 minutes.',
      'Cook millet in broth, fluff with herbs and lime zest.',
      'Plate millet, top with sliced chicken, charred lime, and pepitas.',
    ],
    spotlightTips: [
      'Reserve two tablespoons of glaze to brush on in the final 5 minutes for shine.',
      'Swap millet for quinoa if you want a speedier grain.',
    ],
    nutrition: { calories: 520, protein: 38, carbs: 42, fat: 22, fiber: 5 },
  },
  {
    id: 'espresso-ancho-short-ribs',
    title: 'Espresso Ancho Short Ribs',
    subtitle: 'Slow braise, citrus gremolata, whipped parsnip',
    difficulty: 'ambitious',
    totalTime: 180,
    prepTime: 30,
    rating: 5,
    serves: 4,
    proteins: ['beef'],
    allergens: [],
    fodmap: 'moderate',
    fodmapNotes: 'Uses leek tops and garlic-infused oil to keep the braise gentle.',
    heroGradient: ['#141e30', '#243b55'],
    mealType: 'dinner',
    tags: ['braise', 'date night'],
    moods: ['comfort'],
    ingredients: [
      {
        title: 'Short ribs',
        items: ['3 lbs bone-in short ribs', '2 tsp ancho chili powder', '1 shot espresso', '1 cup dry red wine', '2 cups beef broth'],
      },
      {
        title: 'Parsnip whip',
        items: ['3 large parsnips', '2 tbsp olive oil', '1/2 cup lactose-free milk', 'Salt and pepper'],
      },
      {
        title: 'Gremolata',
        items: ['1/4 cup parsley', 'Zest of 1 orange', '1 tbsp toasted cocoa nibs'],
      },
    ],
    steps: [
      'Sear ribs until deeply browned, then add espresso, wine, broth, and ancho chili. Cover and braise at 325°F (160°C) until tender.',
      'Simmer parsnips until soft and blend with olive oil plus warm milk.',
      'Stir together gremolata components.',
      'Serve ribs over parsnip whip and finish with gremolata.',
    ],
    spotlightTips: [
      'Chill the braise overnight to skim fat and reheat gently for next-level flavor.',
      'Add two strips of orange peel to the pot for perfume.',
    ],
    nutrition: { calories: 640, protein: 44, carbs: 28, fat: 38, fiber: 4 },
  },
  {
    id: 'preserved-lemon-lamb',
    title: 'Preserved Lemon Lamb Chops',
    subtitle: 'Smoky char, fennel salad, herby yogurt',
    difficulty: 'medium',
    totalTime: 35,
    prepTime: 20,
    rating: 4.8,
    serves: 4,
    proteins: ['lamb'],
    allergens: ['dairy'],
    fodmap: 'low',
    fodmapNotes: 'Yogurt sauce uses lactose-free Greek yogurt.',
    heroGradient: ['#f7971e', '#ffd200'],
    mealType: 'dinner',
    tags: ['grill', 'weeknight'],
    moods: ['adventurous'],
    ingredients: [
      {
        title: 'Lamb',
        items: ['8 frenched lamb chops', '1 tbsp preserved lemon pulp', '1 tsp smoked paprika', '1 tbsp olive oil'],
      },
      {
        title: 'Fennel salad',
        items: ['1 bulb fennel, shaved', '1 cup baby arugula', 'Segs of 1 grapefruit', '1 tbsp olive oil'],
      },
      {
        title: 'Yogurt sauce',
        items: ['1/2 cup lactose-free yogurt', '1 tbsp mint, chopped', '1 tsp lemon juice'],
      },
    ],
    steps: [
      'Rub chops with preserved lemon, paprika, oil, salt, and pepper.',
      'Grill or pan-sear over high heat for 3 minutes per side.',
      'Toss fennel with arugula, grapefruit, and olive oil.',
      'Serve chops with fennel salad and mint yogurt.',
    ],
    spotlightTips: [
      'Bring chops to room temperature for even cooking.',
      'Add toasted pistachios for crunch if desired.',
    ],
    nutrition: { calories: 510, protein: 38, carbs: 18, fat: 32, fiber: 4 },
  },
  {
    id: 'maple-mustard-pork',
    title: 'Maple Mustard Pork Tenderloin',
    subtitle: 'Roasted carrots, cider pan sauce, crispy sage',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 15,
    rating: 4.7,
    serves: 4,
    proteins: ['pork'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Garlic is replaced with garlic-infused oil and maple stays within low-FODMAP limits.',
    heroGradient: ['#fbd786', '#f7797d'],
    mealType: 'dinner',
    tags: ['sheet pan', 'comfort'],
    moods: ['comfort', 'refreshing'],
    ingredients: [
      {
        title: 'Tenderloin',
        items: ['1 pork tenderloin', '1 tbsp maple syrup', '1 tbsp Dijon mustard', '1 tbsp garlic-infused oil'],
      },
      {
        title: 'Vegetables',
        items: ['4 rainbow carrots, halved', '1 tbsp olive oil', 'Fresh sage leaves'],
      },
      {
        title: 'Pan sauce',
        items: ['1/2 cup apple cider', '1 tsp whole grain mustard', '1 tsp butter or ghee'],
      },
    ],
    steps: [
      'Sear tenderloin, brush with maple mustard glaze, and roast to 145°F (63°C).',
      'Roast carrots on the same tray until tender and caramelized.',
      'Deglaze pan with cider, whisk in mustard and ghee for a glossy sauce.',
      'Slice pork, spoon sauce over, and top with crispy sage.',
    ],
    spotlightTips: [
      'Rest pork for 5 minutes before slicing to keep juices locked in.',
      'Use parsnips instead of carrots for a winter riff.',
    ],
    nutrition: { calories: 420, protein: 35, carbs: 28, fat: 18, fiber: 4 },
  },
  {
    id: 'saffron-citrus-halibut',
    title: 'Saffron Citrus Halibut',
    subtitle: 'Olive tapenade, fennel broth, charred orange',
    difficulty: 'medium',
    totalTime: 30,
    prepTime: 15,
    rating: 4.9,
    serves: 2,
    proteins: ['fish'],
    allergens: ['fish'],
    fodmap: 'low',
    fodmapNotes: 'Fennel broth stays light with leek tops and infused oil.',
    heroGradient: ['#a1c4fd', '#c2e9fb'],
    mealType: 'dinner',
    tags: ['date night', 'light'],
    moods: ['refreshing'],
    ingredients: [
      {
        title: 'Halibut',
        items: ['2 6-oz halibut fillets', 'Pinch saffron threads', '1 tbsp olive oil', 'Salt and pepper'],
      },
      {
        title: 'Broth',
        items: ['1 bulb fennel, sliced', '1 cup veggie broth', 'Zest + juice of 1 orange', '1 tbsp garlic-infused oil'],
      },
      {
        title: 'Tapenade',
        items: ['2 tbsp chopped olives', '1 tsp capers', '1 tsp parsley'],
      },
    ],
    steps: [
      'Bloom saffron in warm olive oil, brush over halibut, and roast at 375°F (190°C) until flaky.',
      'Simmer fennel with broth, infused oil, and orange zest until tender.',
      'Pulse tapenade ingredients together.',
      'Serve halibut over fennel broth with tapenade and charred orange slices.',
    ],
    spotlightTips: [
      'Use parchment packets if you want a totally hands-off steam.',
      'Reserve fennel fronds for garnish.',
    ],
    nutrition: { calories: 390, protein: 36, carbs: 18, fat: 18, fiber: 3 },
  },
  {
    id: 'brown-butter-scallops',
    title: 'Brown Butter Scallop Risotto',
    subtitle: 'Parmesan crumble, tender peas, lemon oil',
    difficulty: 'ambitious',
    totalTime: 40,
    prepTime: 20,
    rating: 4.9,
    serves: 4,
    proteins: ['shellfish'],
    allergens: ['shellfish', 'dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Keeps onions out by blooming shallot greens in oil and uses lactose-free Parmesan.',
    heroGradient: ['#fbc2eb', '#a6c1ee'],
    mealType: 'dinner',
    tags: ['special', 'comfort'],
    moods: ['comfort'],
    ingredients: [
      {
        title: 'Scallops',
        items: ['1 lb dry sea scallops', '1 tbsp ghee', 'Flaky salt', 'Lemon zest'],
      },
      {
        title: 'Risotto',
        items: ['1 1/2 cups arborio rice', '4 cups warm broth', '1/2 cup dry white wine', '1 cup peas', '1/2 cup grated Parmesan'],
      },
      {
        title: 'Crunch',
        items: ['1/2 cup coarse almond flour', '1 tbsp olive oil', 'Pinch chili flakes'],
      },
    ],
    steps: [
      'Toast rice in olive oil, deglaze with wine, and ladle broth until creamy.',
      'Fold in peas and Parmesan, then keep warm.',
      'Sear scallops in brown butter ghee until deeply golden, 90 seconds per side.',
      'Top bowls with scallops, almond crumble, and lemon zest.',
    ],
    spotlightTips: [
      'Dry scallops very well to guarantee a caramelized crust.',
      'Finish risotto with a splash of broth right before serving for flowy texture.',
    ],
    nutrition: { calories: 560, protein: 34, carbs: 56, fat: 22, fiber: 3 },
  },
  {
    id: 'crispy-harissa-tofu',
    title: 'Crispy Harissa Tofu Toss',
    subtitle: 'Charred broccolini, herb labneh, toasted seeds',
    difficulty: 'medium',
    totalTime: 35,
    prepTime: 20,
    rating: 4.7,
    serves: 4,
    proteins: ['plant'],
    allergens: ['soy', 'dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Labneh uses lactose-free yogurt and harissa stays at 2 tsp per serving.',
    heroGradient: ['#f953c6', '#b91d73'],
    mealType: 'dinner',
    tags: ['sheet pan', 'plant-powered'],
    moods: ['adventurous'],
    ingredients: [
      {
        title: 'Tofu',
        items: ['1 block extra-firm tofu, pressed', '2 tsp harissa paste', '1 tbsp tapioca starch', '1 tbsp avocado oil'],
      },
      {
        title: 'Veg + grains',
        items: ['1 bunch broccolini', '1 cup cooked sorghum', '1/4 cup toasted pumpkin seeds'],
      },
      {
        title: 'Herb labneh',
        items: ['1/2 cup lactose-free yogurt', '2 tbsp chopped dill', 'Zest of 1 lemon'],
      },
    ],
    steps: [
      'Cube tofu, toss with harissa, starch, and oil, then roast at 425°F (220°C) until crisp.',
      'Char broccolini on the same tray during the last 10 minutes.',
      'Toss sorghum with lemon zest and herbs.',
      'Serve bowls with sorghum, broccolini, tofu, labneh dollops, and seeds.',
    ],
    spotlightTips: [
      'Use the convection setting to get the crispiest tofu edges.',
      'Swap sorghum for wild rice to change the texture.',
    ],
    nutrition: { calories: 480, protein: 24, carbs: 48, fat: 20, fiber: 7 },
  },
  {
    id: 'coconut-ginger-lentils',
    title: 'Coconut Ginger Lentil Soup',
    subtitle: 'Carrot ribbons, crispy shallot oil, lime leaf',
    difficulty: 'easy',
    totalTime: 30,
    prepTime: 15,
    rating: 4.8,
    serves: 4,
    proteins: ['plant'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Uses canned lentils rinsed well and garlic-infused oil only.',
    heroGradient: ['#fceabb', '#f8b500'],
    mealType: 'lunch',
    tags: ['soup', 'prep friendly'],
    moods: ['comfort'],
    ingredients: [
      {
        title: 'Soup base',
        items: ['1 cup red lentils', '3 cups veggie broth', '1 cup light coconut milk', '1 tbsp ginger paste', '2 lime leaves'],
      },
      {
        title: 'Finishing',
        items: ['1 cup carrot ribbons', '1 tbsp garlic-infused oil', 'Juice of 1 lime', 'Fresh cilantro'],
      },
    ],
    steps: [
      'Simmer lentils with broth, coconut milk, ginger, and lime leaves until creamy.',
      'Stir in carrot ribbons and cook 2 minutes more.',
      'Finish with infused oil, lime juice, and cilantro.',
      'Ladle into bowls and drizzle with crispy shallot oil if tolerated.',
    ],
    spotlightTips: [
      'Blend half the soup for a velvety texture while leaving some lentils whole.',
      'Add cooked shredded chicken if you need extra protein.',
    ],
    nutrition: { calories: 390, protein: 18, carbs: 52, fat: 12, fiber: 9 },
  },
  {
    id: 'garlic-parm-chickpea-pasta',
    title: 'Garlic-Parm Chickpea Pasta',
    subtitle: 'Roasted broccoli, crispy chickpeas, lemon-pistachio gremolata',
    difficulty: 'easy',
    totalTime: 30,
    prepTime: 15,
    rating: 4.7,
    serves: 4,
    proteins: ['plant'],
    allergens: ['treeNuts', 'dairy'],
    fodmap: 'low',
    fodmapNotes: 'Uses garlic-infused oil and chickpea pasta to stay low-FODMAP.',
    heroGradient: ['#ffd89c', '#f7971e'],
    mealType: 'dinner',
    tags: ['pasta night', '30-minute'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Base', items: ['12 oz chickpea pasta', '2 cups broccoli florets', '1 can chickpeas, drained', '2 tbsp garlic-infused oil'] },
      { title: 'Finish', items: ['1/3 cup grated Parmesan or vegan parm', 'Zest + juice of 1 lemon', '2 tbsp chopped pistachios', 'Parsley leaves'] },
    ],
    steps: [
      'Roast broccoli and chickpeas at 425°F (220°C) with infused oil until crisp, 15 minutes.',
      'Boil pasta to al dente, reserving 1/2 cup cooking water.',
      'Toss pasta with roasted veg, parmesan, lemon juice, and splash of reserved water for gloss.',
      'Top bowls with pistachio-parsley gremolata and extra zest.',
    ],
    spotlightTips: [
      'Swap pistachios for toasted pumpkin seeds if nut-free.',
      'Finish with chili oil for heat.',
    ],
    nutrition: { calories: 520, protein: 22, carbs: 62, fat: 20, fiber: 11 },
  },
  {
    id: 'creamy-lemon-chicken-penne',
    title: 'Creamy Lemon Chicken Penne',
    subtitle: 'One-pot cassava penne, spinach ribbons, seared chicken tenders',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 15,
    rating: 4.9,
    serves: 4,
    proteins: ['chicken'],
    allergens: ['dairy'],
  fodmap: 'moderate',
    fodmapNotes: 'Sauce relies on lactose-free cream and garlic oil to keep things gentle.',
    heroGradient: ['#f9f7d9', '#f9c6b1'],
    mealType: 'dinner',
    tags: ['one pot', 'pasta night'],
    moods: ['comfort', 'refreshing'],
    ingredients: [
      { title: 'Protein', items: ['1 lb chicken tenders', '1 tbsp garlic-infused oil', '1 tsp smoked salt'] },
      { title: 'Pasta', items: ['12 oz gluten-free penne', '3 cups chicken broth', '1 cup lactose-free cream', '2 cups baby spinach', 'Zest of 2 lemons'] },
    ],
    steps: [
      'Sear chicken in garlic-infused oil until golden, set aside.',
      'Simmer penne with broth and cream, stirring until sauce reduces and pasta is al dente.',
      'Fold in spinach, lemon zest, and sliced chicken.',
      'Finish with cracked pepper and chives.',
    ],
    spotlightTips: [
      'Add capers for briny pops.',
      'Use leftover sauce over roasted vegetables the next day.',
    ],
    nutrition: { calories: 610, protein: 42, carbs: 58, fat: 22, fiber: 6 },
  },
  {
    id: 'family-sheet-pan-pizza',
    title: 'Fire-Roasted Garden Pizza',
    subtitle: 'Sheet-pan cassava crust, blistered tomatoes, basil oil',
    difficulty: 'medium',
    totalTime: 45,
    prepTime: 20,
    rating: 4.8,
    serves: 6,
    proteins: ['plant'],
    allergens: ['dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Uses lactose-free mozzarella and roasted garlic-infused oil.',
    heroGradient: ['#f78ca0', '#f9748f'],
    mealType: 'dinner',
    tags: ['pizza night', 'family style'],
    moods: ['comfort', 'adventurous'],
    ingredients: [
      { title: 'Crust', items: ['1 lb gluten-free pizza dough', '2 tbsp olive oil'] },
      { title: 'Toppings', items: ['1 cup roasted cherry tomatoes', '1 cup shredded lactose-free mozzarella', '1/2 cup zucchini ribbons', 'Fresh basil', 'Garlic-infused oil drizzle'] },
    ],
    steps: [
      'Stretch dough onto oiled sheet pan, par-bake 8 minutes at 475°F (245°C).',
      'Top with tomatoes, cheese, zucchini, and basil oil.',
      'Bake until bubbly with charred edges, about 10 minutes more.',
      'Finish with fresh basil leaves and chili flakes.',
    ],
    spotlightTips: [
      'Mix 1 tsp honey into the dough edges for caramelized crust.',
      'Use dairy-free mozzarella for a vegan version.',
    ],
    nutrition: { calories: 430, protein: 18, carbs: 48, fat: 18, fiber: 4 },
  },
  {
    id: 'pepperoni-cast-iron-pizza',
    title: 'Crispy Cast-Iron Pepperoni Pizza',
    subtitle: 'Socca-style crust, hot honey drizzle, pickled chiles',
    difficulty: 'medium',
    totalTime: 40,
    prepTime: 15,
    rating: 4.9,
    serves: 4,
    proteins: ['pork'],
    allergens: ['dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Relies on lactose-free cheese and garlic-infused sauce.',
    heroGradient: ['#f83600', '#f9d423'],
    mealType: 'dinner',
    tags: ['pizza night'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Batter crust', items: ['1 cup chickpea flour', '1 cup water', '1 tbsp olive oil', '1/2 tsp salt'] },
      { title: 'Toppings', items: ['1/2 cup crushed tomatoes', '1 tsp garlic-infused oil', '1 cup lactose-free mozzarella', '12 nitrate-free pepperoni', 'Pickled Fresno chiles', 'Hot honey'] },
    ],
    steps: [
      'Preheat cast-iron skillet with olive oil in a 475°F (245°C) oven.',
      'Pour socca batter, bake 10 minutes.',
      'Add sauce, cheese, pepperoni, chiles; bake until edges frico.',
      'Finish with hot honey drizzle.',
    ],
    spotlightTips: [
      'Place skillet under broiler the last minute for leopard spots.',
      'Swap pepperoni for turkey pepperoni if preferred.',
    ],
    nutrition: { calories: 520, protein: 28, carbs: 42, fat: 24, fiber: 5 },
  },
  {
    id: 'veggie-baked-ziti',
    title: 'Veggie Loaded Baked Ziti',
    subtitle: 'Almond ricotta, roasted peppers, spinach pesto swirl',
    difficulty: 'medium',
    totalTime: 50,
    prepTime: 25,
    rating: 4.6,
    serves: 6,
    proteins: ['plant'],
    allergens: ['treeNuts'],
  fodmap: 'moderate',
    fodmapNotes: 'Ricotta is made from soaked almonds and garlic-infused oil keeps aromatics mellow.',
    heroGradient: ['#ff9966', '#ff5e62'],
    mealType: 'dinner',
    tags: ['meal prep', 'casserole'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Pasta', items: ['12 oz gluten-free ziti', '2 cups marinara made with garlic oil', '1 roasted red pepper, sliced'] },
      { title: 'Almond ricotta', items: ['1 cup soaked blanched almonds', '1/3 cup water', '2 tbsp lemon juice', '2 tbsp nutritional yeast'] },
      { title: 'Pesto swirl', items: ['2 cups spinach', '1/4 cup basil', '2 tbsp olive oil', 'Pumpkin seeds'] },
    ],
    steps: [
      'Blend almonds with water, lemon, and yeast until fluffy.',
      'Cook pasta until shy of al dente and toss with marinara and peppers.',
      'Layer pasta with ricotta dollops and pesto in a baking dish.',
      'Bake at 375°F (190°C) for 15 minutes until bubbling.',
    ],
    spotlightTips: [
      'Broil for 2 minutes for toasted pesto ridges.',
      'Freeze portions flat for easy reheats.',
    ],
    nutrition: { calories: 480, protein: 17, carbs: 56, fat: 20, fiber: 7 },
  },
  {
    id: 'salted-tahini-brownies',
    title: 'Salted Tahini Fudge Brownies',
    subtitle: 'Black cocoa swirl, espresso salt, chewy edges',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 15,
    rating: 5,
    serves: 16,
    proteins: ['plant'],
    allergens: ['sesame'],
    fodmap: 'moderate',
    fodmapNotes: 'Sweetened with maple syrup and brown sugar for steady FODMAP levels.',
    heroGradient: ['#434343', '#000000'],
    mealType: 'dessert',
    tags: ['dessert', 'batch cooking'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Batter', items: ['1 cup tahini', '1 cup coconut sugar', '2 eggs', '1/2 cup black cocoa', '1/4 cup tapioca flour', '1 tsp espresso powder'] },
      { title: 'Finish', items: ['Flaky salt', 'Extra tahini for swirl'] },
    ],
    steps: [
      'Whisk tahini with sugar and eggs until glossy.',
      'Fold in cocoa, tapioca, espresso.',
      'Spread into lined 8x8 pan, swirl remaining tahini, sprinkle salt.',
      'Bake at 350°F (175°C) for 22 minutes and cool completely before slicing.',
    ],
    spotlightTips: [
      'Chill before slicing for clean edges.',
      'Add dairy-free chocolate chunks for extra pools.',
    ],
    nutrition: { calories: 210, protein: 5, carbs: 22, fat: 12, fiber: 3 },
  },
  {
    id: 'brown-butter-apple-pie',
    title: 'Cinnamon Maple Apple Pie',
    subtitle: 'Almond-oat crust, brown butter crumble, apple cider caramel',
    difficulty: 'ambitious',
    totalTime: 75,
    prepTime: 30,
    rating: 4.8,
    serves: 8,
    proteins: ['plant'],
    allergens: ['treeNuts', 'dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'Apples keep things moderate; use lactose-free butter for crumble.',
    heroGradient: ['#f8b500', '#fceabb'],
    mealType: 'dessert',
    tags: ['pie', 'holiday'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Crust', items: ['1 cup almond flour', '1 cup oat flour', '1/3 cup brown sugar', '1/3 cup melted ghee'] },
      { title: 'Filling', items: ['5 pink lady apples, sliced', '1/4 cup maple syrup', '1 tsp cinnamon', '1 tbsp tapioca'] },
      { title: 'Crumble', items: ['1/3 cup chopped pecans', '2 tbsp brown butter ghee', '2 tbsp coconut sugar'] },
    ],
    steps: [
      'Press crust mixture into pie plate and par-bake 10 minutes.',
      'Toss apples with maple, cinnamon, tapioca.',
      'Fill crust, top with pecan crumble.',
      'Bake at 375°F (190°C) for 40 minutes until bubbly and golden.',
    ],
    spotlightTips: [
      'Brush crust edges with maple halfway through for shine.',
      'Serve with coconut whipped cream for dairy-free option.',
    ],
    nutrition: { calories: 360, protein: 6, carbs: 42, fat: 18, fiber: 5 },
  },
  {
    id: 'midnight-honeycomb-ice-cream',
    title: 'Midnight Honeycomb Ice Cream',
    subtitle: 'Lactose-free vanilla base, burnt sugar shards, cacao nib dust',
    difficulty: 'ambitious',
    totalTime: 480,
    prepTime: 25,
    rating: 4.9,
    serves: 8,
    proteins: ['plant'],
    allergens: ['dairy'],
  fodmap: 'moderate',
    fodmapNotes: 'Uses lactose-free cream and milk so it stays gentle.',
    heroGradient: ['#141e30', '#243b55'],
    mealType: 'dessert',
    tags: ['ice cream', 'make ahead'],
    moods: ['refreshing'],
    ingredients: [
      { title: 'Base', items: ['2 cups lactose-free cream', '1 cup lactose-free milk', '1/2 cup maple syrup', '1 vanilla bean', 'Pinch salt'] },
      { title: 'Honeycomb', items: ['1/2 cup coconut sugar', '2 tbsp honey', '1 tsp baking soda'] },
      { title: 'Finish', items: ['2 tbsp cacao nibs'] },
    ],
    steps: [
      'Simmer cream, milk, maple, vanilla bean, and salt; chill completely.',
      'Churn in ice cream maker until soft-serve texture.',
      'Make honeycomb candy, cool, and shatter.',
      'Layer churned ice cream with honeycomb shards and cacao nibs; freeze 4 hours.',
    ],
    spotlightTips: [
      'Warm scoop with hot water for picture-perfect curls.',
      'Fold in espresso powder for a tiramisu riff.',
    ],
    nutrition: { calories: 320, protein: 6, carbs: 34, fat: 18, fiber: 1 },
  },
  {
    id: 'strawberry-basil-sorbet',
    title: 'Strawberry Basil Sorbet',
    subtitle: 'No-churn freezer method, lime zest sparkle, basil syrup',
    difficulty: 'easy',
    totalTime: 240,
    prepTime: 15,
    rating: 4.7,
    serves: 6,
    proteins: ['plant'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Strawberries and lime keep it firmly low-FODMAP.',
    heroGradient: ['#fa709a', '#fee140'],
    mealType: 'dessert',
    tags: ['ice cream', 'no churn'],
    moods: ['refreshing'],
    ingredients: [
      { title: 'Sorbet', items: ['4 cups frozen strawberries', '1/3 cup maple syrup', 'Juice of 2 limes', '1/4 cup basil leaves', 'Pinch salt'] },
    ],
    steps: [
      'Blend frozen berries with maple, lime juice, basil, and salt until silky.',
      'Pour into loaf pan, cover, and freeze 3 hours, whisking once after 45 minutes.',
      'Scoop and garnish with extra basil chiffonade.',
    ],
    spotlightTips: [
      'Add 1 tbsp vodka to keep it scoopable straight from the freezer.',
      'Use raspberries for a tart swap.',
    ],
    nutrition: { calories: 120, protein: 1, carbs: 30, fat: 0, fiber: 3 },
  },
  {
    id: 'triple-berry-hand-pies',
    title: 'Triple Berry Hand Pies',
    subtitle: 'Cassava pastry, hibiscus glaze, chia jam filling',
    difficulty: 'medium',
    totalTime: 55,
    prepTime: 25,
    rating: 4.6,
    serves: 8,
    proteins: ['plant'],
    allergens: [],
    fodmap: 'moderate',
    fodmapNotes: 'Portions keep berries within gentle FODMAP limits.',
    heroGradient: ['#bc4e9c', '#f80759'],
    mealType: 'dessert',
    tags: ['hand pie', 'snack'],
    moods: ['adventurous'],
    ingredients: [
      { title: 'Pastry', items: ['2 cups cassava flour', '1/2 cup chilled coconut oil', '1 egg', '4 tbsp ice water'] },
      { title: 'Filling', items: ['1 cup blueberries', '1 cup raspberries', '2 tbsp chia seeds', '2 tbsp maple syrup'] },
      { title: 'Glaze', items: ['1/2 cup powdered sugar', '1 tbsp hibiscus tea concentrate'] },
    ],
    steps: [
      'Pulse cassava flour with coconut oil until sandy, add egg and ice water to form dough; chill.',
      'Simmer berries with maple, mash, and stir in chia to thicken.',
      'Roll dough, cut circles, fill with berry jam, crimp, and bake at 375°F (190°C) 18 minutes.',
      'Cool and drizzle hibiscus glaze.',
    ],
    spotlightTips: [
      'Dust with freeze-dried berry powder for color.',
      'Freeze unbaked pies and bake from frozen with 5 extra minutes.',
    ],
    nutrition: { calories: 280, protein: 4, carbs: 36, fat: 12, fiber: 4 },
  },
  {
    id: 'weeknight-sausage-sheet-pan',
    title: 'Weeknight Sausage + Veg Sheet Pan',
    subtitle: 'Smoked paprika vinaigrette, crispy potatoes, lemony kale',
    difficulty: 'easy',
    totalTime: 35,
    prepTime: 15,
    rating: 4.5,
    serves: 4,
    proteins: ['pork'],
    allergens: [],
    fodmap: 'low',
    fodmapNotes: 'Uses garlic-infused oil instead of garlic powder.',
    heroGradient: ['#fbd72b', '#f9484a'],
    mealType: 'dinner',
    tags: ['sheet pan', 'meal prep'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Tray', items: ['12 oz uncured chicken sausages, sliced', '1 lb baby potatoes, halved', '2 cups chopped kale', '1 cup carrots, coins', '2 tbsp garlic-infused oil'] },
      { title: 'Vinaigrette', items: ['1 tbsp smoked paprika', '1 tbsp maple syrup', '2 tbsp apple cider vinegar', '1 tbsp olive oil'] },
    ],
    steps: [
      'Roast potatoes and carrots at 425°F (220°C) with half the infused oil for 15 minutes.',
      'Add sausages and kale, roast another 10 minutes.',
      'Whisk vinaigrette and drizzle over tray before serving.',
    ],
    spotlightTips: [
      'Broil for 2 minutes for crispy sausage edges.',
      'Swap kale for broccolini when in season.',
    ],
    nutrition: { calories: 480, protein: 24, carbs: 42, fat: 24, fiber: 6 },
  },
  {
    id: 'backyard-bbq-chicken-pizza',
    title: 'Backyard BBQ Chicken Pizza',
    subtitle: 'Grilled crust, pickled red onion, smoked gouda drizzle',
    difficulty: 'medium',
    totalTime: 35,
    prepTime: 20,
    rating: 4.7,
    serves: 4,
    proteins: ['chicken'],
    allergens: ['dairy'],
    fodmap: 'moderate',
    fodmapNotes: 'BBQ sauce is sweetened with maple and uses garlic-infused oil.',
    heroGradient: ['#f857a6', '#ff5858'],
    mealType: 'dinner',
    tags: ['pizza night'],
    moods: ['comfort'],
    ingredients: [
      { title: 'Crust', items: ['1 gluten-free pizza shell or dough', '1 tbsp olive oil'] },
      { title: 'Toppings', items: ['1 cup shredded grilled chicken thighs', '1/2 cup maple BBQ sauce', '1 cup smoked lactose-free gouda', 'Pickled red onion', 'Cilantro'] },
    ],
    steps: [
      'Grill crust over medium heat 2 minutes per side.',
      'Top with BBQ sauce, chicken, cheese, onion.',
      'Cover grill to melt cheese, finish with cilantro.',
    ],
    spotlightTips: [
      'Brush crust edges with garlic oil before grilling.',
      'Add thin peach slices for summer sweetness.',
    ],
    nutrition: { calories: 520, protein: 36, carbs: 44, fat: 22, fiber: 4 },
  },
];

export function getRecipeById(id: string) {
  return recipes.find((recipe) => recipe.id === id);
}

export function getMoodRecommendations(mood: Mood) {
  return recipes.filter((recipe) => recipe.moods.includes(mood));
}
