import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RecipeCard } from '@/components/recipes/recipe-card';
import { ThemedText } from '@/components/themed-text';
import { getMoodRecommendations, type Mood } from '@/constants/recipes';

const moods: {
  key: Mood;
  label: string;
  description: string;
  colors: [string, string];
}[] = [
  {
    key: 'comfort',
    label: 'Comfort',
    description: 'Brothy bowls, warm spices, and cozy textures.',
    colors: ['#ff9a9e', '#fad0c4'],
  },
  {
    key: 'refreshing',
    label: 'Refreshing',
    description: 'Crunchy salads, citrus, and playful herbs.',
    colors: ['#a1ffce', '#faffd1'],
  },
  {
    key: 'adventurous',
    label: 'Adventurous',
    description: 'Bold chiles, smoky edges, and global riffs.',
    colors: ['#f6d365', '#fda085'],
  },
];

const pantryItems = [
  { id: 'garlic-oil', label: 'Garlic-infused olive oil', tip: 'All the aroma, none of the FODMAPs.' },
  { id: 'millet-flour', label: 'Toasted millet flour', tip: 'Behaves like cake flour in tender bakes.' },
  { id: 'buckwheat-soba', label: '100% buckwheat soba', tip: 'Look for single-ingredient noodles.' },
  { id: 'coconut-aminos', label: 'Coconut aminos', tip: 'Soy-free umami that reduces evenly.' },
  { id: 'chia', label: 'Golden chia seeds', tip: 'Add body to batters and extra fiber.' },
];

export default function TabTwoScreen() {
  const router = useRouter();
  const [activeMood, setActiveMood] = useState<Mood>('comfort');
  const [pantryState, setPantryState] = useState<Record<string, boolean>>({});

  const recommendations = useMemo(
    () => getMoodRecommendations(activeMood).slice(0, 2),
    [activeMood]
  );

  const pantryProgress = useMemo(() => {
    const total = pantryItems.length;
    const checked = pantryItems.filter((item) => pantryState[item.id]).length;
    return checked / total;
  }, [pantryState]);

  function togglePantry(id: string) {
    setPantryState((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <ThemedText type="title" style={styles.pageTitle}>
          Flavor studio
        </ThemedText>
        <Text style={styles.pageSubtitle}>
          Dial in tonight’s mood, prep your pantry, and master new techniques for gluten-free cooking.
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodRow}>
        {moods.map((mood) => (
          <Pressable key={mood.key} style={styles.moodCard} onPress={() => setActiveMood(mood.key)}>
            <LinearGradient
              colors={mood.colors}
              style={[styles.moodGradient, activeMood === mood.key && styles.moodGradientActive]}
            >
              <Text style={styles.moodLabel}>{mood.label}</Text>
              <Text style={styles.moodDescription}>{mood.description}</Text>
              <View style={styles.moodFooter}>
                <Text style={styles.moodFooterText}>
                  {getMoodRecommendations(mood.key).length} recipes
                </Text>
                {activeMood === mood.key ? (
                  <MaterialCommunityIcons name="check-circle" color="#fff" size={20} />
                ) : (
                  <MaterialCommunityIcons name="chevron-right" color="#fff" size={20} />
                )}
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">Moodboard picks</ThemedText>
        <Text style={styles.sectionSubtext}>Tap for the full recipe card</Text>
      </View>

      <View style={styles.recommendationGrid}>
        {recommendations.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => router.push({ pathname: '/recipes/[id]', params: { id: recipe.id } })}
          />
        ))}
      </View>

      <View style={styles.pantryCard}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Pantry refresh</ThemedText>
          <Text style={styles.sectionSubtext}>{Math.round(pantryProgress * 100)}% stocked</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pantryProgress * 100}%` }]} />
        </View>
        {pantryItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => togglePantry(item.id)}
            style={[styles.pantryRow, pantryState[item.id] && styles.pantryRowActive]}
          >
            <View style={[styles.checkbox, pantryState[item.id] && styles.checkboxChecked]}>
              {pantryState[item.id] ? (
                <MaterialCommunityIcons name="check" size={16} color="#111826" />
              ) : null}
            </View>
            <View style={styles.pantryCopy}>
              <Text style={styles.pantryLabel}>{item.label}</Text>
              <Text style={styles.pantryTip}>{item.tip}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.techniquesCard}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Technique lab</ThemedText>
          <Text style={styles.sectionSubtext}>Quick wins</Text>
        </View>
        <View style={styles.techRow}>
          <TechniqueTile
            icon="food-steak"
            title="Sear first, bake second"
            copy="Roast vegetables after a hot skillet sear for caramelized edges without gluten flour dredges."
          />
          <TechniqueTile
            icon="pot-steam-outline"
            title="Parchment steam"
            copy="Infuse aromatics into fish or tofu with coconut milk and citrus sealed in parchment packets."
          />
          <TechniqueTile
            icon="blender"
            title="Alternate flours"
            copy="Blend almond, millet, and tapioca for bounce—hydrate batter 5 minutes before cooking."
          />
        </View>
      </View>
    </ScrollView>
  );
}

function TechniqueTile({ icon, title, copy }: { icon: string; title: string; copy: string }) {
  return (
    <View style={styles.techTile}>
      <View style={styles.techIcon}>
        <MaterialCommunityIcons name={icon as any} size={20} color="#111826" />
      </View>
      <Text style={styles.techTitle}>{title}</Text>
      <Text style={styles.techCopy}>{copy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 56,
    gap: 24,
  },
  pageTitle: {
    marginBottom: 6,
  },
  pageSubtitle: {
    color: '#4b5563',
    lineHeight: 20,
  },
  moodRow: {
    gap: 16,
  },
  moodCard: {
    width: 260,
  },
  moodGradient: {
    borderRadius: 28,
    padding: 20,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  moodGradientActive: {
    borderWidth: 2,
    borderColor: '#fff',
    boxShadow: '0 10px 28px rgba(249, 115, 22, 0.28)',
  },
  moodLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111826',
  },
  moodDescription: {
    color: '#111826',
    opacity: 0.8,
    marginTop: 6,
  },
  moodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  moodFooterText: {
    color: '#111826',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionSubtext: {
    color: '#6b7280',
  },
  recommendationGrid: {
    gap: 16,
  },
  pantryCard: {
    borderRadius: 28,
    backgroundColor: '#f9fafb',
    padding: 20,
    gap: 16,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111826',
    borderRadius: 999,
  },
  pantryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  pantryRowActive: {
    opacity: 0.6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#111826',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#a7f3d0',
    borderColor: '#10b981',
  },
  pantryCopy: {
    flex: 1,
  },
  pantryLabel: {
    fontWeight: '700',
    color: '#111826',
  },
  pantryTip: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  techniquesCard: {
    borderRadius: 28,
    backgroundColor: '#111826',
    padding: 20,
    gap: 16,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techTile: {
    flexBasis: '30%',
    minWidth: 140,
    flexGrow: 1,
    backgroundColor: '#1f253d',
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  techIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  techTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  techCopy: {
    color: '#d1d5db',
    fontSize: 13,
    lineHeight: 18,
  },
});
