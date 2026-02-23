import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Recipe } from '@/constants/recipes';

const mealColors: Record<Recipe['mealType'], string> = {
  breakfast: '#fdf8c2',
  lunch: '#c2f6f1',
  dinner: '#c9cbff',
  snack: '#ffd1d1',
};

const fodmapColors = {
  low: '#17c47b',
  moderate: '#f2c94c',
  high: '#eb5757',
};

export type RecipeCardProps = {
  recipe: Recipe;
  onPress?: () => void;
};

function getReadableAllergen(list: Recipe['allergens']) {
  if (!list.length) {
    return 'Free from highlighted allergens';
  }

  return `Contains: ${list
    .map((item) =>
      item
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase())
        .trim()
    )
    .join(', ')}`;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <LinearGradient colors={recipe.heroGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <View style={styles.headerRow}>
          <View style={[styles.badge, { backgroundColor: mealColors[recipe.mealType] }]}>
            <Text style={styles.badgeText}>{recipe.mealType.toUpperCase()}</Text>
          </View>
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" color="#ffc960" size={16} />
            <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.subtitle}>{recipe.subtitle}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="timer-outline" color="#fff" size={16} />
            <Text style={styles.metaText}>{recipe.totalTime} min</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="account-multiple-outline" color="#fff" size={16} />
            <Text style={styles.metaText}>Serves {recipe.serves}</Text>
          </View>
          <View style={styles.metaItem}>
            <View style={[styles.statusDot, { backgroundColor: fodmapColors[recipe.fodmap] }]} />
            <Text style={styles.metaText}>{recipe.fodmap.toUpperCase()} FODMAP</Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          {recipe.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.allergenText}>{getReadableAllergen(recipe.allergens)}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    overflow: 'hidden',
    boxShadow: '0px 20px 35px rgba(17, 24, 38, 0.25)',
    marginBottom: 20,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ translateY: 2 }],
  },
  gradient: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#111826',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff28',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#fff',
    fontWeight: '600',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#ffffff25',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  allergenText: {
    color: '#fff',
    marginTop: 14,
    fontSize: 13,
  },
});
