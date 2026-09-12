import { people } from '@/data/prototype';
import { usePrototypeStore } from '@/store/prototype';
import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { MatchRow } from '@/components/matches/match-row';
import { Screen, Text } from '@/components/ui';
import {
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function MatchesScreen() {
  const theme = useTheme();
  const messages = usePrototypeStore((state) => state.messages);

  return (
    <Screen scroll>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>
            VIBE CONNECTIONS
          </Text>

          <Text style={styles.title}>
            Chats
          </Text>
        </View>

        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: theme.accentSoft,
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              {
                color: theme.accentMuted,
              },
            ]}
          >
            02
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: theme.border,
          },
        ]}
      />

      {/* INTRO */}
      <View style={styles.intro}>
        <Text type="label" style={styles.sectionLabel}>
          ACTIVE CONVERSATIONS
        </Text>

        <Text
          style={[
            styles.introText,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          A quieter place for the connections that made it
          beyond the first impression.
        </Text>
      </View>

      {/* NEW MATCH */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text type="label" style={styles.sectionLabel}>
            NEW MATCH
          </Text>

          <View style={styles.newIndicator}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: theme.accentMuted,
                },
              ]}
            />

            <Text
              style={[
                styles.newText,
                {
                  color: theme.accentMuted,
                },
              ]}
            >
              NEW
            </Text>
          </View>
        </View>

        {people.map((person) => (
          <Link key={person.id} href={{ pathname: '/match/[id]', params: { id: person.id } }} asChild>
            <Pressable accessibilityRole="button" accessibilityLabel={`View ${person.name}'s dossier`}
              style={({ pressed }) => [styles.card, { marginBottom: Spacing.three, borderColor: theme.border, backgroundColor: theme.surface, opacity: pressed ? 0.72 : 1 }]}>
              <MatchRow name={person.name} preview={`${person.city} · ${person.resonance}% resonance`} photo={person.photos[0]} time="NEW MATCH" />
              <Text style={styles.matchQuote}>{person.note}</Text>
              <Text type="label" style={{ marginTop: Spacing.three }}>VIEW DOSSIER →</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      <View style={styles.section}>
        <Text type="label" style={styles.sectionLabel}>CONVERSATIONS</Text>
        <View style={[styles.conversationList, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          {people.map((person) => {
            const last = messages[person.id]?.at(-1);
            return (
              <Link key={person.id} href={{ pathname: '/chat/[id]', params: { id: person.id } }} asChild>
                <Pressable accessibilityRole="button" accessibilityLabel={`Chat with ${person.name}`} style={({ pressed }) => [styles.conversationPressable, { opacity: pressed ? 0.65 : 1 }]}>
                  <MatchRow name={person.name} photo={person.photos[0]} preview={last ? `You: ${last.body}` : person.preview} time={last?.time ?? '8:42 PM'} />
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>

      {/* FOOTNOTE */}
      <View style={styles.footnote}>
        <View
          style={[
            styles.footnoteLine,
            {
              backgroundColor: theme.border,
            },
          ]}
        />

        <Text
          style={[
            styles.footnoteText,
            {
              color: theme.textTertiary,
            },
          ]}
        >
          CONNECTIONS ARE BETTER WHEN THEY AREN&apos;T RUSHED
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },

  eyebrow: {
    fontFamily: Typography.bodySans.fontFamily,
    marginBottom: 4,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.8,
    opacity: 0.5,
  },

  title: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 40,
    lineHeight: 43,
    fontWeight: '400',
    letterSpacing: -1,
  },

  countBadge: {
    minWidth: 34,
    height: 26,
    paddingHorizontal: 9,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  countText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },

  intro: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
  },

  sectionLabel: {
    opacity: 0.55,
  },

  introText: {
    maxWidth: 330,
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 17,
    lineHeight: 26,
  },

  section: {
    marginBottom: Spacing.six,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },

  newIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  newText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.lg,
    padding: Spacing.four,
  },

  matchQuote: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 18,
    lineHeight: 27,
    fontStyle: 'italic',
  },

  conversationList: {
    marginTop: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },

  conversationPressable: {
    paddingHorizontal: Spacing.two,
  },

  footnote: {
    alignItems: 'center',
    paddingBottom: Spacing.five,
  },

  footnoteLine: {
    width: 42,
    height: StyleSheet.hairlineWidth,
    marginBottom: Spacing.three,
  },

  footnoteText: {
    fontFamily: Typography.bodySans.fontFamily,
    maxWidth: 240,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.35,
  },
});