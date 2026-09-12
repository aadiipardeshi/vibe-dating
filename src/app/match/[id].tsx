import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const profilePic = require('@/assets/images/profilepic.jpg');
const profilePic2 = require('@/assets/images/profilepic2.jpg');

const tags = [
  'Coastal Hikes',
  'Filter Coffee',
  '35mm Film',
  'Scandinavian Design',
  'Vinyl',
];

export default function MatchScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen
      scroll
      contentStyle={styles.screen}
    >
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.roundButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text style={styles.backIcon}>
            ‹
          </Text>
        </Pressable>

        <View style={styles.topTitle}>
          <Text style={styles.eyebrow}>
            VIBE CONNECTION
          </Text>

          <Text style={styles.headerTitle}>
            Match
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.roundButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text style={styles.moreIcon}>
            ···
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: theme.border,
          },
        ]}
      />

      {/* MATCH INTRO */}
      <View style={styles.matchIntro}>
        <Text type="label" style={styles.sectionLabel}>
          MATCH {id?.toUpperCase() ?? 'PREVIEW'}
        </Text>

        <Text style={styles.matchTitle}>
          You found each other.
        </Text>

        <Text
          style={[
            styles.matchSubtitle,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          A shared rhythm around spontaneous escapes,
          slow mornings and places worth wandering into.
        </Text>
      </View>

      {/* PROFILE HERO */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
          Shadows.subtle,
        ]}
      >
        <View style={styles.hero}>
          <Image
            source={profilePic}
            style={styles.heroImage}
            contentFit="cover"
          />

          <View style={styles.heroOverlay} />

          <View style={styles.heroTop}>
            <View style={styles.heroPill}>
              <View
                style={[
                  styles.greenDot,
                  {
                    backgroundColor: theme.success,
                  },
                ]}
              />

              <Text style={styles.heroPillText}>
                EXPLORER · DUBLIN
              </Text>
            </View>

            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                87% RESONANCE
              </Text>
            </View>
          </View>

          <View style={styles.heroBottom}>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.name}>
                  Maya
                </Text>

                <Text style={styles.age}>
                  27
                </Text>

                <View style={styles.verified}>
                  <Text style={styles.verifiedText}>
                    ✓
                  </Text>
                </View>
              </View>

              <Text style={styles.location}>
                DUBLIN, IRELAND · ARCHITECT
              </Text>
            </View>

            <Text style={styles.plate}>
              PLATE 01 / 02
            </Text>
          </View>
        </View>

        {/* WHY YOU MATCHED */}
        <View style={styles.cardBody}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View
                style={[
                  styles.sectionDot,
                  {
                    backgroundColor: theme.accentMuted,
                  },
                ]}
              />

              <Text type="label" style={styles.sectionLabel}>
                WHY YOU MATCHED
              </Text>
            </View>

            <Text
              style={[
                styles.concordance,
                {
                  color: theme.success,
                },
              ]}
            >
              High Concordance
            </Text>
          </View>

          <Text style={styles.editorialCopy}>
            You both instinctively gravitate toward
            spontaneous weekend escapes over staying within
            the city walls.
          </Text>

          <View
            style={[
              styles.bodyDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          {/* BIO */}
          <Text type="label" style={styles.sectionLabel}>
            BIO & PERSONA
          </Text>

          <Text style={styles.bodyCopy}>
            Architect by day, sea swimmer by weekend.
            Seeking someone who finds quiet cadence in
            overcast mornings, forgotten bookshops and
            unscripted road journeys along the Atlantic edge.
          </Text>

          <View
            style={[
              styles.bodyDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          {/* QUESTION */}
          <Text type="label" style={styles.sectionLabel}>
            FUN QUESTION
          </Text>

          <View
            style={[
              styles.questionCard,
              {
                backgroundColor: theme.backgroundElement,
              },
            ]}
          >
            <Text
              style={[
                styles.quoteMark,
                {
                  color: theme.accentMuted,
                },
              ]}
            >
              “
            </Text>

            <Text style={styles.question}>
              What&apos;s your ideal way to spend a rainy day?
            </Text>

            <Text
              style={[
                styles.answer,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              Coffee, a good book, and a window with a view.
            </Text>
          </View>

          <View
            style={[
              styles.bodyDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          {/* TAGS */}
          <Text type="label" style={styles.sectionLabel}>
            SIGNATURES & AESTHETIC TENDENCIES
          </Text>

          <View style={styles.tags}>
            {tags.map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  {
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={styles.tagText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.bodyDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          {/* SECOND PHOTO */}
          <View style={styles.photoHeader}>
            <Text type="label" style={styles.sectionLabel}>
              PHOTOGRAPHIC SALON
            </Text>

            <Text
              style={[
                styles.viewAll,
                {
                  color: theme.textSecondary,
                },
              ]}
            >
              VIEW ALL (2)
            </Text>
          </View>

          <View style={styles.secondPhoto}>
            <Image
              source={profilePic2}
              style={styles.secondPhotoImage}
              contentFit="cover"
            />

            <View style={styles.secondOverlay} />

            <Text style={styles.secondCaption}>
              PLATE 02 · PHOTOGRAPHY
            </Text>
          </View>

          <View
            style={[
              styles.bodyDivider,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          {/* FRIENDS SAY */}
          <Text type="label" style={styles.sectionLabel}>
            FRIENDS SAY
          </Text>

          <View style={styles.friendQuote}>
            <Text
              style={[
                styles.friendQuoteMark,
                {
                  color: theme.accentMuted,
                },
              ]}
            >
              “
            </Text>

            <Text style={styles.friendQuoteText}>
              The person who can turn a simple plan into an
              unforgettable adventure.
            </Text>
          </View>
        </View>
      </View>

      {/* CONNECTION CTA */}
      <View style={styles.connectionSection}>
        <Text type="label" style={styles.sectionLabel}>
          THE NEXT CHAPTER
        </Text>

        <Text style={styles.connectionTitle}>
          Say hello while the moment is still new.
        </Text>

        <Text
          style={[
            styles.connectionBody,
            {
              color: theme.textSecondary,
            },
          ]}
        >
          You already know there is something worth
          exploring. The rest belongs in conversation.
        </Text>

        <Pressable
          onPress={() => router.push('/chat/preview')}
          style={({ pressed }) => [
            styles.messageButton,
            {
              backgroundColor: theme.accent,
              opacity: pressed ? 0.82 : 1,
            },
          ]}
        >
          <Text
            type="label"
            style={{
              color: theme.onAccent,
            }}
          >
            START CONVERSATION
          </Text>

          <Text
            style={[
              styles.messageArrow,
              {
                color: theme.onAccent,
              },
            ]}
          >
            →
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.secondaryButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text type="label">
            RETURN TO DISCOVER
          </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View
          style={[
            styles.footerLine,
            {
              backgroundColor: theme.border,
            },
          ]}
        />

        <Text
          style={[
            styles.footerText,
            {
              color: theme.textTertiary,
            },
          ]}
        >
          VIBE · CONNECTION N° 01
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: Spacing.six,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
  },

  roundButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    marginTop: -2,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 30,
    lineHeight: 31,
    fontWeight: '300',
  },

  moreIcon: {
    marginTop: -6,
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 1,
  },

  topTitle: {
    flex: 1,
    alignItems: 'center',
  },

  eyebrow: {
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    opacity: 0.45,
  },

  headerTitle: {
    marginTop: 1,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 21,
    lineHeight: 24,
  },

  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
  },

  matchIntro: {
    alignItems: 'center',
    paddingTop: Spacing.five,
    paddingBottom: Spacing.five,
  },

  sectionLabel: {
    opacity: 0.52,
  },

  matchTitle: {
    marginTop: Spacing.two,
    fontFamily: Typography.display.fontFamily,
    fontSize: 34,
    lineHeight: 39,
    letterSpacing: -0.8,
    textAlign: 'center',
  },

  matchSubtitle: {
    maxWidth: 330,
    marginTop: Spacing.two,
    fontFamily: Typography.body.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  profileCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },

  hero: {
    height: 470,
    position: 'relative',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  heroTop: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },

  heroPill: {
    minHeight: 28,
    paddingHorizontal: 11,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(247,245,239,0.94)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  heroPillText: {
    color: '#24211F',
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  heroBottom: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  name: {
    color: '#FFFFFF',
    fontFamily: Typography.display.fontFamily,
    fontSize: 39,
    lineHeight: 42,
    letterSpacing: -1,
  },

  age: {
    color: '#FFFFFF',
    fontFamily: Typography.heading.fontFamily,
    fontSize: 20,
    lineHeight: 24,
    opacity: 0.92,
  },

  verified: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: 'rgba(247,245,239,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifiedText: {
    color: '#24211F',
    fontSize: 9,
    lineHeight: 10,
    fontWeight: '700',
  },

  location: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    opacity: 0.88,
  },

  plate: {
    color: '#FFFFFF',
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.76,
  },

  cardBody: {
    padding: Spacing.four,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
  },

  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  concordance: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 13,
    lineHeight: 17,
    fontStyle: 'italic',
  },

  editorialCopy: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
  },

  bodyDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: Spacing.five,
  },

  bodyCopy: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 17,
    lineHeight: 27,
  },

  questionCard: {
    marginTop: Spacing.three,
    borderRadius: Radius.md,
    padding: Spacing.four,
  },

  quoteMark: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 35,
    lineHeight: 30,
  },

  question: {
    marginTop: 3,
    fontFamily: Typography.body.fontFamily,
    fontSize: 17,
    lineHeight: 25,
    fontStyle: 'italic',
  },

  answer: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 15,
    lineHeight: 23,
    fontStyle: 'italic',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.three,
  },

  tag: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.full,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  tagText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
  },

  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAll: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  secondPhoto: {
    height: 225,
    marginTop: Spacing.three,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },

  secondPhotoImage: {
    width: '100%',
    height: '100%',
  },

  secondOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  secondCaption: {
    position: 'absolute',
    left: 14,
    bottom: 13,
    color: '#FFFFFF',
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
  },

  friendQuote: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },

  friendQuoteMark: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 37,
    lineHeight: 33,
  },

  friendQuoteText: {
    flex: 1,
    fontFamily: Typography.body.fontFamily,
    fontSize: 19,
    lineHeight: 29,
    fontStyle: 'italic',
  },

  connectionSection: {
    paddingTop: Spacing.six,
    alignItems: 'center',
  },

  connectionTitle: {
    maxWidth: 320,
    marginTop: Spacing.three,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
    textAlign: 'center',
  },

  connectionBody: {
    maxWidth: 315,
    marginTop: Spacing.two,
    fontFamily: Typography.body.fontFamily,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },

  messageButton: {
    width: '100%',
    minHeight: 52,
    marginTop: Spacing.five,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },

  messageArrow: {
    fontSize: 18,
    lineHeight: 20,
  },

  secondaryButton: {
    width: '100%',
    minHeight: 50,
    marginTop: Spacing.two,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    alignItems: 'center',
    paddingTop: Spacing.six,
  },

  footerLine: {
    width: 42,
    height: StyleSheet.hairlineWidth,
    marginBottom: Spacing.three,
  },

  footerText: {
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '600',
    letterSpacing: 1.3,
  },
});