import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MatchRow } from '@/components/matches/match-row';
import { Avatar, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { people } from '@/data/prototype';
import { useTheme } from '@/hooks/use-theme';
import { usePrototypeStore } from '@/store/prototype';

export default function MatchesScreen() {
  const theme = useTheme();
  const messages = usePrototypeStore((state) => state.messages);
  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="bodySans" accessibilityRole="header" style={styles.title}>Chats</Text>
        <Text type="bodySans" tone="textSecondary" style={styles.meta}>{people.length}</Text>
      </View>
      <Text type="bodySans" tone="textSecondary" style={styles.label}>NEW MATCHES</Text>
      <ScrollView horizontal style={styles.matchStrip} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.matches}>
        {people.map((person) => (
          <Link key={person.id} href={{ pathname: '/match/[id]', params: { id: person.id } }} asChild>
            <Pressable accessibilityRole="button" accessibilityLabel={`View ${person.name}'s profile`} style={({ pressed }) => [styles.match, { opacity: pressed ? 0.65 : 1 }]}>
              <Avatar name={person.name} source={person.photos[0]} size={60} />
              <Text type="bodySans" style={styles.name} numberOfLines={1}>{person.name}</Text>
              <Text type="bodySans" tone="textSecondary" style={styles.meta}>{person.resonance}% match</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
      <Text type="bodySans" tone="textSecondary" style={styles.label}>MESSAGES</Text>
      {people.map((person) => {
        const last = messages[person.id]?.at(-1);
        return (
          <Link key={person.id} href={{ pathname: '/chat/[id]', params: { id: person.id } }} asChild>
            <Pressable accessibilityRole="button" accessibilityLabel={`Chat with ${person.name}`} style={({ pressed }) => [styles.conversation, { borderBottomColor: theme.border, opacity: pressed ? 0.65 : 1 }]}>
              <MatchRow name={person.name} photo={person.photos[0]} preview={last ? `You: ${last.body}` : person.preview} time={last?.time ?? '8:42 PM'} />
            </Pressable>
          </Link>
        );
      })}
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.five },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600' },
  label: { fontSize: 11, lineHeight: 16, fontWeight: '600', letterSpacing: 0.8, marginBottom: Spacing.two },
  matchStrip: { flexGrow: 0, flexShrink: 0 },
  matches: { gap: Spacing.four, paddingBottom: Spacing.five },
  match: { width: 84, alignItems: 'center', gap: Spacing.one },
  name: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  meta: { fontSize: 12, lineHeight: 17 },
  conversation: { borderBottomWidth: StyleSheet.hairlineWidth },
});
