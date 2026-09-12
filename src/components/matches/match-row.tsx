import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';

type MatchRowProps = { name: string; preview: string; photo?: number; time?: string };
export function MatchRow({ name, preview, photo, time }: MatchRowProps) {
  return (
    <View style={styles.row}>
      <Avatar name={name} source={photo} size={46} />
      <View style={styles.copy}>
        <View style={styles.topRow}>
          <Text type="bodySans" style={styles.name} numberOfLines={1}>{name}</Text>
          <Text type="bodySans" tone="textSecondary" style={styles.time}>{time}</Text>
        </View>
        <Text type="bodySans" tone="textSecondary" style={styles.preview} numberOfLines={1}>{preview}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.three },
  copy: { flex: 1, minWidth: 0, gap: Spacing.one },
  topRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
  name: { flex: 1, fontSize: 15, lineHeight: 21, fontWeight: '600' },
  time: { fontSize: 11, lineHeight: 16 },
  preview: { fontSize: 14, lineHeight: 20 },
});
