import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FilterChip } from '@/components/filter-chip';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  allergensList,
  fodmapFilters,
  recipes,
  type Allergen,
  type FodmapFilterKey,
  proteinFilters,
  type ProteinKey,
} from '@/constants/recipes';

type CuratedCombo = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: [string, string];
  search?: string;
  fodmap?: FodmapFilterKey;
  proteins?: ProteinKey[];
  allergens?: Allergen[];
};

type ActiveFilterPill =
  | { key: string; label: string; type: 'allergen'; value: Allergen }
  | { key: string; label: string; type: 'protein'; value: ProteinKey }
  | { key: string; label: string; type: 'fodmap'; value: FodmapFilterKey }
  | { key: string; label: string; type: 'search'; value: null };

const fodmapLabels: Record<FodmapFilterKey, string> = {
  any: 'All recipes',
  low: 'Low FODMAP',
  gentle: 'Gentle FODMAP',
};

const curatedCombos: CuratedCombo[] = [
  {
    id: 'weekday-reset',
    title: 'Weeknight reset',
    description: '25-min bowls + low FODMAP comfort',
    icon: 'leaf-circle',
    gradient: ['#f8f7ff', '#d3f5ff'],
    search: 'bowl',
    fodmap: 'low',
    proteins: ['fish', 'plant'],
  },
  {
    id: 'slow-simmer',
    title: 'Slow & cozy',
    description: 'Braises, short ribs, wintery heat',
    icon: 'pot-mix',
    gradient: ['#ffe1c6', '#ffc3a0'],
    search: 'braise',
    fodmap: 'gentle',
    proteins: ['beef', 'pork'],
  },
  {
    id: 'brunch-party',
    title: 'Brunch party',
    description: 'Stacks, citrus, market salads',
    icon: 'white-balance-sunny',
    gradient: ['#fff1eb', '#ace0f9'],
    search: 'brunch',
    proteins: ['plant'],
  },
  {
    id: 'turkey-cozy-club',
    title: 'Turkey cozy club',
    description: 'Gravy bowls, casseroles, citrus bowls',
    icon: 'food-turkey',
    gradient: ['#ffe29f', '#ffa99f'],
    search: 'turkey',
    fodmap: 'gentle',
    proteins: ['turkey'],
  },
  {
    id: 'dairy-free-glow',
    title: 'Dairy-free glow',
    description: 'Coconut gravy, broth bowls, sorbet treats',
    icon: 'leaf',
    gradient: ['#d9a7c7', '#fffcdc'],
    allergens: ['dairy'],
  },
];

const searchShortcuts = ['citrus', 'tacos', 'turkey', 'dairy free', '30-minute', 'brothy', 'meal prep'];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeAllergens, setActiveAllergens] = useState<Set<Allergen>>(new Set());
  const [activeProteins, setActiveProteins] = useState<Set<ProteinKey>>(new Set());
  const [fodmapFocus, setFodmapFocus] = useState<FodmapFilterKey>('any');

  const featuredRecipe = recipes[0];
  const filtersActive =
    activeAllergens.size +
    activeProteins.size +
    (fodmapFocus !== 'any' ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const turkeyCount = useMemo(
    () => recipes.filter((recipe) => recipe.proteins.includes('turkey')).length,
    []
  );
  const dairyFreeCount = useMemo(
    () => recipes.filter((recipe) => !recipe.allergens.includes('dairy')).length,
    []
  );
  const quickMealsCount = useMemo(
    () => recipes.filter((recipe) => recipe.totalTime <= 30).length,
    []
  );

  const quickStats = useMemo(
    () => [
      {
        id: 'filters',
        label: 'Filters on',
        value: filtersActive,
        icon: 'tune-vertical',
        accent: '#fde4cf',
      },
      {
        id: 'turkey',
        label: 'Turkey-friendly',
        value: turkeyCount,
        icon: 'food-turkey',
        accent: '#fff1eb',
      },
      {
        id: 'dairy-free',
        label: 'Dairy-free picks',
        value: dairyFreeCount,
        icon: 'leaf',
        accent: '#e0f2fe',
      },
      {
        id: 'quick',
        label: '≤30 min meals',
        value: quickMealsCount,
        icon: 'timer-sand',
        accent: '#e0f2f1',
      },
    ],
    [filtersActive, turkeyCount, dairyFreeCount, quickMealsCount]
  );

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return recipes
      .filter((recipe) => {
      if (activeAllergens.size > 0) {
        const conflicts = recipe.allergens.some((allergen) => activeAllergens.has(allergen));
        if (conflicts) {
          return false;
        }
      }

      if (activeProteins.size > 0) {
        const matchesSelectedProtein = recipe.proteins.some((protein) =>
          activeProteins.has(protein)
        );
        if (!matchesSelectedProtein) {
          return false;
        }
      }

      if (fodmapFocus === 'low' && recipe.fodmap !== 'low') {
        return false;
      }

      if (fodmapFocus === 'gentle' && recipe.fodmap === 'high') {
        return false;
      }

        if (!query) {
          return true;
        }

        const haystack = [
          recipe.title,
          recipe.subtitle,
          ...recipe.tags,
          ...recipe.moods,
          ...recipe.spotlightTips,
          ...recipe.ingredients.flatMap((section) => [section.title, ...section.items]),
        ];

        return haystack.some((entry) => entry.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return a.totalTime - b.totalTime;
      });
  }, [activeAllergens, activeProteins, fodmapFocus, search]);

  const activeFilterPills = useMemo<ActiveFilterPill[]>(() => {
    const pills: ActiveFilterPill[] = [];
    const query = search.trim();

    activeAllergens.forEach((key) => {
      const label = allergensList.find((item) => item.key === key)?.label ?? key;
      pills.push({ key: `allergen-${key}`, label: `No ${label}`, type: 'allergen', value: key });
    });

    activeProteins.forEach((key) => {
      const label = proteinFilters.find((item) => item.key === key)?.label ?? key;
      pills.push({ key: `protein-${key}`, label, type: 'protein', value: key });
    });

    if (fodmapFocus !== 'any') {
      pills.push({ key: 'fodmap', label: fodmapLabels[fodmapFocus], type: 'fodmap', value: fodmapFocus });
    }

    if (query) {
      pills.push({ key: 'search', label: `Search: “${query}”`, type: 'search', value: null });
    }

    return pills;
  }, [activeAllergens, activeProteins, fodmapFocus, search]);

  function toggleAllergen(allergen: Allergen) {
    setActiveAllergens((prev) => {
      const next = new Set(prev);
      if (next.has(allergen)) {
        next.delete(allergen);
      } else {
        next.add(allergen);
      }
      return next;
    });
  }

  function toggleProtein(protein: ProteinKey) {
    setActiveProteins((prev) => {
      const next = new Set(prev);
      if (next.has(protein)) {
        next.delete(protein);
      } else {
        next.add(protein);
      }
      return next;
    });
  }

  function clearFilters() {
    setActiveAllergens(new Set());
    setActiveProteins(new Set());
    setFodmapFocus('any');
    setSearch('');
  }

  function clearSearch() {
    setSearch('');
  }

  function applyShortcut(term: string) {
    setSearch(term);
  }

  function removePill(pill: ActiveFilterPill) {
    switch (pill.type) {
      case 'allergen':
        toggleAllergen(pill.value);
        break;
      case 'protein':
        toggleProtein(pill.value);
        break;
      case 'fodmap':
        setFodmapFocus('any');
        break;
      case 'search':
        setSearch('');
        break;
    }
  }

  function applyCombo(combo: CuratedCombo) {
    setSearch(combo.search ?? '');
    setFodmapFocus(combo.fodmap ?? 'any');
    setActiveProteins(new Set(combo.proteins ?? []));
    setActiveAllergens(new Set(combo.allergens ?? []));
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#f8ede3', '#fcd3c1']} style={styles.heroCard}>
        <Text style={styles.eyebrow}>SafeSpoon</Text>
        <Text style={styles.heroTitle}>Gluten-free & allergen smart</Text>
        <Text style={styles.heroCopy}>
          Chef-tested recipes, low-FODMAP notes, and quick filters so you spend less time vetting and
          more time cooking.
        </Text>
        <View style={styles.heroStatsRow}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{recipes.length}</Text>
            <Text style={styles.heroStatLabel}>recipes curated</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>
              {recipes.filter((recipe) => recipe.fodmap === 'low').length}
            </Text>
            <Text style={styles.heroStatLabel}>low FODMAP</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{filtersActive}</Text>
            <Text style={styles.heroStatLabel}>filters active</Text>
          </View>
        </View>
        <Pressable
          style={styles.heroButton}
          onPress={() =>
            router.push({ pathname: '/recipes/[id]', params: { id: featuredRecipe.id } })
          }
        >
          <Text style={styles.heroButtonText}>Open chef’s pick</Text>
          <MaterialCommunityIcons name="arrow-right" color="#111826" size={18} />
        </Pressable>
      </LinearGradient>

      <View style={styles.comboSection}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Instant inspiration</ThemedText>
          <Text style={styles.sectionSubtext}>Tap to auto-fill the filters</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.comboRow}
        >
          {curatedCombos.map((combo) => (
            <Pressable key={combo.id} onPress={() => applyCombo(combo)}>
              <LinearGradient colors={combo.gradient} style={styles.comboCard}>
                <View style={styles.comboIconBadge}>
                  <MaterialCommunityIcons name={combo.icon as any} color="#111826" size={18} />
                </View>
                <Text style={styles.comboTitle}>{combo.title}</Text>
                <Text style={styles.comboDescription}>{combo.description}</Text>
                <View style={styles.comboFooter}>
                  <MaterialCommunityIcons name="gesture-tap-button" size={16} color="#111826" />
                  <Text style={styles.comboFooterText}>Apply combo</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ThemedView style={styles.filterSection}>
        <View style={styles.filterIntroRow}>
          <View>
            <ThemedText type="subtitle">Filter your pantry vibes</ThemedText>
            <Text style={styles.sectionSubtext}>Layer allergen, protein, FODMAP, and smart search</Text>
          </View>
          {filtersActive ? (
            <Pressable onPress={clearFilters}>
              <Text style={styles.clearAction}>Reset all</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={[styles.filterBlock, styles.allergenBlock]}>
          <View style={styles.blockHeader}>
            <View style={styles.blockLabelGroup}>
              <View style={[styles.blockIcon, styles.blockIconWarm]}>
                <MaterialCommunityIcons name="shield-alert-outline" size={18} color="#b77446" />
              </View>
              <View>
                <Text style={styles.blockTitle}>Allergen guard</Text>
                <Text style={styles.blockCaption}>Tap to hide any culprit ingredients</Text>
              </View>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {allergensList.map((allergen) => (
              <FilterChip
                key={allergen.key}
                label={allergen.label}
                icon={allergen.icon}
                active={activeAllergens.has(allergen.key)}
                onPress={() => toggleAllergen(allergen.key)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.filterBlock, styles.proteinBlock]}>
          <View style={styles.blockHeader}>
            <View style={styles.blockLabelGroup}>
              <View style={[styles.blockIcon, styles.blockIconCool]}>
                <MaterialCommunityIcons name="food-drumstick" size={18} color="#1f3c5f" />
              </View>
              <View>
                <Text style={styles.blockTitle}>Protein guard</Text>
                <Text style={styles.blockCaption}>Spotlight the cuts you crave tonight</Text>
              </View>
            </View>
          </View>
          <Text style={styles.sectionHelper}>Tap to feature proteins or leave blank for all.</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.proteinChipRow}
          >
            {proteinFilters.map((protein) => (
              <FilterChip
                key={protein.key}
                label={protein.label}
                icon={protein.icon}
                subtitle={protein.description}
                compact
                active={activeProteins.has(protein.key)}
                onPress={() => toggleProtein(protein.key)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.filterBlock, styles.fodmapBlock]}>
          <View style={styles.blockHeader}>
            <View style={styles.blockLabelGroup}>
              <View style={[styles.blockIcon, styles.blockIconMint]}>
                <MaterialCommunityIcons name="leaf" size={18} color="#0f5132" />
              </View>
              <View>
                <Text style={styles.blockTitle}>FODMAP focus</Text>
                <Text style={styles.blockCaption}>Choose how gentle you need to feel</Text>
              </View>
            </View>
          </View>
          <View style={styles.segmentGroup}>
            {fodmapFilters.map((filter) => (
              <Pressable
                key={filter.key}
                style={[styles.segment, fodmapFocus === filter.key && styles.segmentActive]}
                onPress={() => setFodmapFocus(filter.key)}
              >
                <Text
                  style={[styles.segmentLabel, fodmapFocus === filter.key && styles.segmentLabelActive]}
                >
                  {filter.label}
                </Text>
                <Text style={styles.segmentDescription}>{filter.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.filterBlock, styles.searchBlock]}>
          <View style={styles.blockHeader}>
            <View style={styles.blockLabelGroup}>
              <View style={[styles.blockIcon, styles.blockIconNeutral]}>
                <MaterialCommunityIcons name="magnify" size={18} color="#2f1c15" />
              </View>
              <View>
                <Text style={styles.blockTitle}>Search & shortcuts</Text>
                <Text style={styles.blockCaption}>Type anything or tap a mood</Text>
              </View>
            </View>
          </View>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search pasta, tacos, dessert..."
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              accessibilityLabel="Search recipes"
              returnKeyType="search"
            />
            {search.trim() ? (
              <Pressable accessibilityLabel="Clear search" onPress={clearSearch} style={styles.clearSearchButton}>
                <MaterialCommunityIcons name="close-circle" size={18} color="#b77446" />
              </Pressable>
            ) : null}
          </View>

          <View style={styles.shortcutRow}>
            {searchShortcuts.map((term) => (
              <Pressable key={term} style={styles.shortcutChip} onPress={() => applyShortcut(term)}>
                <MaterialCommunityIcons name="flash-outline" size={14} color="#b77446" />
                <Text style={styles.shortcutText}>{term}</Text>
              </Pressable>
            ))}
          </View>

          {activeFilterPills.length ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillRow}
            >
              {activeFilterPills.map((pill) => (
                <Pressable key={pill.key} style={styles.filterPill} onPress={() => removePill(pill)}>
                  <Text style={styles.filterPillText}>{pill.label}</Text>
                  <MaterialCommunityIcons name="close" size={14} color="#111826" />
                </Pressable>
              ))}
            </ScrollView>
          ) : null}
        </View>
      </ThemedView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickStatsRow}
      >
        {quickStats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.accent }]}>
              <MaterialCommunityIcons name={stat.icon as any} size={16} color="#111826" />
            </View>
            <Text style={styles.statNumber}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">Chef-crafted recipes</ThemedText>
        <Text style={styles.sectionCount}>{filteredRecipes.length} showing</Text>
      </View>

      <View style={styles.listContainer}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPress={() => router.push({ pathname: '/recipes/[id]', params: { id: recipe.id } })}
          />
        ))}
      </View>

      {filteredRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="emoticon-confused-outline" size={32} color="#88999c" />
          <Text style={styles.emptyTitle}>No recipes match that combo</Text>
          <Text style={styles.emptyCopy}>
            Try clearing an allergen, widening your FODMAP focus, or searching for a different vibe.
          </Text>
          <Pressable style={styles.emptyButton} onPress={clearFilters}>
            <Text style={styles.emptyButtonText}>Clear filters</Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    gap: 24,
    backgroundColor: '#fbf8f2',
  },
  heroCard: {
    borderRadius: 32,
    padding: 24,
    gap: 12,
    boxShadow: '0px 20px 45px rgba(33, 37, 41, 0.25)',
  },
  eyebrow: {
    color: '#b77446',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2f1c15',
  },
  heroCopy: {
    color: '#4b332c',
    lineHeight: 20,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  heroStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#e2c5b4',
  },
  heroStatNumber: {
    color: '#2f1c15',
    fontSize: 20,
    fontWeight: '700',
  },
  heroStatLabel: {
    color: '#7c5d4a',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  heroButton: {
    marginTop: 4,
    backgroundColor: '#111826',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtonText: {
    fontWeight: '700',
    color: '#fff',
  },
  comboSection: {
    gap: 12,
  },
  filterSection: {
    borderRadius: 28,
    padding: 20,
    backgroundColor: '#fff',
    gap: 20,
    boxShadow: '0px 18px 40px rgba(17, 24, 38, 0.08)',
  },
  filterIntroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionCount: {
    color: '#6b7280',
    fontWeight: '600',
  },
  sectionSubtext: {
    color: '#8b8b92',
    fontSize: 12,
  },
  clearAction: {
    color: '#ef4444',
    fontWeight: '600',
  },
  comboRow: {
    paddingVertical: 8,
    gap: 16,
  },
  comboCard: {
    width: 220,
    borderRadius: 28,
    padding: 18,
    marginRight: 16,
    gap: 10,
    boxShadow: '0px 18px 35px rgba(17, 24, 38, 0.18)',
  },
  comboIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffffaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comboTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2f1c15',
  },
  comboDescription: {
    color: '#4b332c',
    lineHeight: 18,
  },
  comboFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  comboFooterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111826',
    textTransform: 'uppercase',
  },
  chipRow: {
    paddingTop: 8,
    paddingBottom: 2,
    gap: 12,
  },
  filterBlock: {
    borderRadius: 24,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#f0e7dc',
    backgroundColor: '#fdfaf6',
  },
  allergenBlock: {
    backgroundColor: '#fff7f1',
    borderColor: '#fde4cf',
  },
  proteinBlock: {
    backgroundColor: '#f1f5ff',
    borderColor: '#dbe2ff',
  },
  fodmapBlock: {
    backgroundColor: '#f0fdf4',
    borderColor: '#c8f2d4',
  },
  searchBlock: {
    backgroundColor: '#fff',
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  blockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  blockIconWarm: {
    backgroundColor: '#fde4cf',
  },
  blockIconCool: {
    backgroundColor: '#dbe2ff',
  },
  blockIconMint: {
    backgroundColor: '#d1fae5',
  },
  blockIconNeutral: {
    backgroundColor: '#f4ede6',
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  blockCaption: {
    color: '#6b7280',
    fontSize: 12,
  },
  shortcutRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  shortcutChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f4ede6',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  shortcutText: {
    color: '#7a4b2e',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3b3c',
  },
  sectionHelper: {
    fontSize: 12,
    color: '#8b8b92',
  },
  proteinChipRow: {
    paddingVertical: 4,
    gap: 12,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fef4ec',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    boxShadow: '0px 10px 20px rgba(17, 24, 38, 0.07)',
  },
  filterPillText: {
    color: '#7a4b2e',
    fontWeight: '600',
  },
  segmentGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  segment: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    backgroundColor: '#fff',
  },
  segmentActive: {
    borderColor: '#111826',
    backgroundColor: '#111826',
  },
  segmentLabel: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  segmentLabelActive: {
    color: '#fff',
  },
  segmentDescription: {
    color: '#6b7280',
    fontSize: 13,
    lineHeight: 18,
  },
  searchBar: {
    borderRadius: 24,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 12px 30px rgba(15, 23, 42, 0.08)',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearSearchButton: {
    padding: 4,
  },
  listContainer: {
    marginTop: 8,
    gap: 20,
  },
  emptyState: {
    backgroundColor: '#fff4ed',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#ffedd5',
    boxShadow: '0px 18px 30px rgba(148, 64, 14, 0.12)',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#b45309',
  },
  emptyCopy: {
    textAlign: 'center',
    color: '#92400e',
  },
  emptyButton: {
    marginTop: 6,
    borderRadius: 999,
    backgroundColor: '#111826',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  quickStatsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 16,
  },
  statCard: {
    width: 160,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#f0e7dc',
    backgroundColor: '#fff',
    padding: 16,
    marginRight: 16,
    boxShadow: '0px 16px 30px rgba(17, 24, 38, 0.08)',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111826',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
