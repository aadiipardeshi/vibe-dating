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

        <Link href="/match/preview" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.card,
              {
                borderColor: theme.border,
                backgroundColor: theme.surface,
                opacity: pressed ? 0.72 : 1,
              },
            ]}
          >
            <View style={styles.cardTop}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={styles.avatarText}>
                  M
                </Text>
              </View>

              <View style={styles.cardIdentity}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>
                    Maya
                  </Text>

                  <Text style={styles.age}>
                    27
                  </Text>
                </View>

                <Text style={styles.meta}>
                  DUBLIN · 87% RESONANCE
                </Text>
              </View>

              <Text style={styles.arrow}>
                ↗
              </Text>
            </View>

            <View
              style={[
                styles.innerDivider,
                {
                  backgroundColor: theme.border,
                },
              ]}
            />

            <Text style={styles.matchQuote}>
              “The beginning of something worth being
              curious about.”
            </Text>

            <View style={styles.matchFooter}>
              <Text
                style={[
                  styles.matchFooterText,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                VIEW PROFILE DOSSIER
              </Text>

              <Text
                style={[
                  styles.matchFooterText,
                  {
                    color: theme.textSecondary,
                  },
                ]}
              >
                JUST NOW
              </Text>
            </View>
          </Pressable>
        </Link>
      </View>

      {/* CONVERSATIONS */}
      <View style={styles.section}>
        <Text type="label" style={styles.sectionLabel}>
          CONVERSATIONS
        </Text>

        <View
          style={[
            styles.conversationList,
            {
              borderColor: theme.border,
              backgroundColor: theme.surface,
            },
          ]}
        >
          <Link href="/chat/preview" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.conversationPressable,
                {
                  opacity: pressed ? 0.65 : 1,
                },
              ]}
            >
              <MatchRow
                name="Maya"
                preview="That little bookshop sounds exactly like my kind of Sunday."
              />
            </Pressable>
          </Link>

          <View
            style={[
              styles.rowDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          <Link href="/chat/preview" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.conversationPressable,
                {
                  opacity: pressed ? 0.65 : 1,
                },
              ]}
            >
              <MatchRow
                name="Anika"
                preview="Coffee first, then we can decide where the afternoon goes."
              />
            </Pressable>
          </Link>
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
    marginBottom: 4,
    fontSize: 9,
    lineHeight: 12,
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
    fontSize: 9,
    lineHeight: 12,
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
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.lg,
    padding: Spacing.four,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 21,
    lineHeight: 24,
  },

  cardIdentity: {
    flex: 1,
    marginLeft: Spacing.three,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },

  name: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 23,
    lineHeight: 27,
  },

  age: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.55,
  },

  meta: {
    marginTop: 3,
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    opacity: 0.45,
  },

  arrow: {
    fontSize: 17,
    lineHeight: 20,
    opacity: 0.42,
  },

  innerDivider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.four,
  },

  matchQuote: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 18,
    lineHeight: 27,
    fontStyle: 'italic',
  },

  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.four,
    gap: 12,
  },

  matchFooterText: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '600',
    letterSpacing: 1.1,
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

  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: Spacing.four,
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
    maxWidth: 240,
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 13,
    fontWeight: '600',
    letterSpacing: 1.35,
  },
});