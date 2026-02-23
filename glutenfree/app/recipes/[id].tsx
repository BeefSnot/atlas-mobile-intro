import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getRecipeById, proteinFilters } from '@/constants/recipes';

export default function RecipeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const recipe = params.id ? getRecipeById(params.id) : undefined;
  const [isSaved, setIsSaved] = useState(false);

  const allergenCopy = useMemo(() => {
    if (!recipe) {
      return '';
    }
    if (!recipe.allergens.length) {
      return 'Free from the highlighted allergens';
    }
    return `Contains: ${recipe.allergens
      .map((item) =>
        item
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (char) => char.toUpperCase())
          .trim()
      )
      .join(', ')}`;
  }, [recipe]);

  const proteinMeta = useMemo(() => {
    if (!recipe) {
      return [] as { key: string; label: string; icon: string }[];
    }

    return recipe.proteins.map((protein) => {
      const meta = proteinFilters.find((item) => item.key === protein);
      return {
        key: protein,
        label: meta?.label ?? protein,
        icon: meta?.icon ?? 'food-fork-drink',
      };
    });
  }, [recipe]);

  if (!recipe) {
    return (
      <ThemedView style={styles.missingState}>
        <Stack.Screen options={{ title: 'Recipe not found' }} />
        <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color="#94a3b8" />
        <ThemedText type="title">Recipe not found</ThemedText>
        <ThemedText style={{ textAlign: 'center' }}>
          The recipe you tried to open is no longer in the collection.
        </ThemedText>
        <Pressable style={styles.heroButton} onPress={() => router.back()}>
          <Text style={styles.heroButtonText}>Go back</Text>
        </Pressable>
      </ThemedView>
    );
  }

  const nutritionEntries = Object.entries(recipe.nutrition);

  async function shareRecipe() {
    try {
      await Share.share({
        message: `${recipe.title} — gluten-free favorite with ${recipe.subtitle}.`,
        title: recipe.title,
      });
    } catch {
      // noop
    }
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerBlurEffect: 'regular',
        }}
      />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={recipe.heroGradient} style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{recipe.mealType.toUpperCase()}</Text>
            </View>
            <View style={styles.heroActions}>
              <Pressable
                style={[styles.iconButton, isSaved && styles.iconButtonActive]}
                onPress={() => setIsSaved((prev) => !prev)}
              >
                <MaterialCommunityIcons
                  name={isSaved ? 'bookmark-check' : 'bookmark-outline'}
                  size={20}
                  color={isSaved ? '#111826' : '#fff'}
                />
              </Pressable>
              <Pressable style={styles.iconButton} onPress={shareRecipe}>
                <MaterialCommunityIcons name="share-variant" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
          <Text style={styles.detailTitle}>{recipe.title}</Text>
          <Text style={styles.detailSubtitle}>{recipe.subtitle}</Text>
          <View style={styles.detailMetaRow}>
            <MetaChip icon="timer-outline" label="Prep" value={`${recipe.prepTime} min`} />
            <MetaChip icon="fire" label="Total" value={`${recipe.totalTime} min`} />
            <MetaChip icon="account-group" label="Serves" value={`${recipe.serves}`} />
          </View>
          <View style={styles.heroAccentRow}>
            <View style={styles.ratingBadge}>
              <MaterialCommunityIcons name="star" size={18} color="#fbbf24" />
              <View>
                <Text style={styles.ratingValue}>{recipe.rating.toFixed(1)}</Text>
                <Text style={styles.ratingLabel}>avg. rating</Text>
              </View>
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyLabel}>Difficulty</Text>
              <Text style={styles.difficultyValue}>{recipe.difficulty}</Text>
            </View>
          </View>
          <View style={styles.heroChipRow}>
            {proteinMeta.map((protein) => (
              <View key={`protein-${protein.key}`} style={styles.heroChip}>
                <MaterialCommunityIcons name={protein.icon as any} size={14} color="#111826" />
                <Text style={styles.heroChipText}>{protein.label}</Text>
              </View>
            ))}
            {recipe.moods.map((mood) => (
              <View key={`mood-${mood}`} style={styles.heroChipMuted}>
                <MaterialCommunityIcons name="sparkles" size={14} color="#fff" />
                <Text style={styles.heroChipMutedText}>{mood}</Text>
              </View>
            ))}
          </View>
          <View style={styles.heroDivider} />
          <Text style={styles.allergenNote}>{allergenCopy}</Text>
          <Text style={styles.fodmapNote}>{recipe.fodmapNotes}</Text>
        </LinearGradient>

        <View style={styles.sectionCard}>
          <SectionTitle icon="food-apple" title="Ingredients" subtitle="Shop & prep" />
          {recipe.ingredients.map((section) => (
            <View key={section.title} style={styles.ingredientsSection}>
              <Text style={styles.sectionLabel}>{section.title}</Text>
              {section.items.map((item) => (
                <View key={item} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <SectionTitle icon="chef-hat" title="Cook it" subtitle="Follow the flow" />
          {recipe.steps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <SectionTitle icon="lightbulb-on-outline" title="Spotlight" subtitle="Chef notes" />
          {recipe.spotlightTips.map((tip) => (
            <View key={tip} style={styles.tipRow}>
              <MaterialCommunityIcons name="star-four-points-outline" size={18} color="#fbbf24" />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <SectionTitle icon="nutrition" title="Nutrition" subtitle="Per serving" />
          <View style={styles.nutritionGrid}>
            {nutritionEntries.map(([key, value]) => (
              <View key={key} style={styles.nutritionCell}>
                <Text style={styles.nutritionLabel}>{key}</Text>
                <Text style={styles.nutritionValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ctaRow}>
          <Pressable style={[styles.ctaButton, styles.ctaPrimary]} onPress={shareRecipe}>
            <MaterialCommunityIcons name="share-variant" size={18} color="#111826" />
            <Text style={styles.ctaButtonText}>Share recipe</Text>
          </Pressable>
          <Pressable style={[styles.ctaButton, styles.ctaSecondary]} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={18} color="#fff" />
            <Text style={styles.ctaButtonSecondaryText}>Back to list</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionIcon}>
        <MaterialCommunityIcons name={icon as any} size={18} color="#111826" />
      </View>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function MetaChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.metaChip}>
      <MaterialCommunityIcons name={icon as any} size={16} color="#111826" />
      <View>
        <Text style={styles.metaChipLabel}>{label}</Text>
        <Text style={styles.metaChipValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fbf8f2',
  },
  container: {
    paddingBottom: 48,
    gap: 18,
  },
  heroCard: {
    padding: 24,
    paddingTop: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    gap: 14,
    boxShadow: '0px 32px 55px rgba(17, 24, 38, 0.35)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: '#ffffff33',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#fef3c7',
    borderColor: '#fef3c7',
  },
  detailTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    marginTop: 8,
  },
  detailSubtitle: {
    color: '#f3f4f6',
    lineHeight: 22,
  },
  detailMetaRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaChip: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  metaChipLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaChipValue: {
    fontWeight: '700',
    color: '#111826',
  },
  heroAccentRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  ratingValue: {
    color: '#111826',
    fontWeight: '700',
    fontSize: 18,
  },
  ratingLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  difficultyBadge: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ffffff66',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  difficultyLabel: {
    color: '#f3f4f6',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1,
  },
  difficultyValue: {
    color: '#fff',
    fontWeight: '700',
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  heroChip: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  heroChipText: {
    color: '#111826',
    fontWeight: '600',
  },
  heroChipMuted: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ffffff55',
    alignItems: 'center',
  },
  heroChipMutedText: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  heroDivider: {
    height: 1,
    backgroundColor: '#ffffff33',
    marginVertical: 12,
  },
  allergenNote: {
    color: '#fff',
    fontWeight: '600',
  },
  fodmapNote: {
    color: '#e0e7ff',
  },
  sectionCard: {
    padding: 20,
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 28,
    gap: 14,
    boxShadow: '0px 25px 45px rgba(17, 24, 38, 0.08)',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111826',
  },
  sectionSubtitle: {
    color: '#6b7280',
  },
  ingredientsSection: {
    gap: 6,
  },
  sectionLabel: {
    fontWeight: '700',
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#111826',
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    color: '#374151',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#111826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    color: '#374151',
    lineHeight: 20,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    color: '#92400e',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nutritionCell: {
    width: '30%',
    minWidth: 100,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 14,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111826',
  },
  ctaRow: {
    marginHorizontal: 24,
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
  },
  ctaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
  },
  ctaPrimary: {
    backgroundColor: '#fff',
    boxShadow: '0px 16px 30px rgba(17, 24, 38, 0.15)',
  },
  ctaSecondary: {
    backgroundColor: '#111826',
  },
  ctaButtonText: {
    fontWeight: '700',
    color: '#111826',
  },
  ctaButtonSecondaryText: {
    fontWeight: '700',
    color: '#fff',
  },
  missingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 24,
  },
  heroButton: {
    marginTop: 4,
    backgroundColor: '#111826',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
