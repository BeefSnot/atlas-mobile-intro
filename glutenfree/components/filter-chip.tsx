import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type FilterChipProps = {
  label: string;
  icon?: string;
  active?: boolean;
  subtitle?: string;
  compact?: boolean;
  onPress?: () => void;
};

export function FilterChip({ label, icon, active, subtitle, compact, onPress }: FilterChipProps) {
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = active ? 'rgba(255,255,255,0.8)' : '#8b8b8b';

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.chip,
        compact && styles.compact,
        active && styles.activeChip,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {icon ? (
        <View style={[styles.iconBadge, active && styles.iconBadgeActive]}>
          <MaterialCommunityIcons
            name={icon as any}
            size={compact ? 16 : 18}
            color={active ? '#fff' : '#5e6973'}
          />
        </View>
      ) : null}
      <View style={styles.labelGroup}>
        <Text style={[styles.label, { color: active ? '#fff' : textColor }]}>{label}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 12,
    backgroundColor: '#fff',
    boxShadow: '0px 12px 30px rgba(17, 24, 38, 0.08)',
  },
  compact: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeChip: {
    backgroundColor: '#111826',
    borderColor: '#111826',
    boxShadow: '0px 16px 30px rgba(17, 24, 38, 0.35)',
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f8',
  },
  iconBadgeActive: {
    backgroundColor: '#ffffff25',
    borderColor: '#ffffff25',
  },
  labelGroup: {
    flexShrink: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: '#8b8b8b',
    marginTop: 2,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});
