import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type DiscoverCardProps = {
  name: string;
  age: number;
  neighborhood: string;
  bio: string;
  photos: number[];
  funQuestion: string;
  funAnswer: string;
  friendsThink: string;
};

export function DiscoverCard({
  name,
  age,
  neighborhood,
  bio,
  photos,
  funQuestion,
  funAnswer,
  friendsThink,
}: DiscoverCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevated
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        nestedScrollEnabled
      >
        {/* HERO IMAGE */}
        <View style={styles.hero}>
          {photos[0] && (
            <Image
              source={photos[0]}
              style={styles.heroImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.heroShade} />

          {/* TOP TAGS */}
          <View style={styles.heroTopRow}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                EXPLORER · DUBLIN
              </Text>
            </View>

            <View style={styles.heroPill}>
              <View style={styles.pinkDot} />

              <Text style={styles.heroPillText}>
                87% RESONANCE
              </Text>
            </View>
          </View>

          {/* PROFILE INFO */}
          <View style={styles.heroBottom}>
            <View style={styles.heroIdentity}>
              <Text style={styles.heroName}>
                {name}
                <Text style={styles.heroAge}> {age}</Text>
              </Text>

              <Text style={styles.heroLocation}>
                {neighborhood.toUpperCase()} · PUNE
              </Text>
            </View>

            <Text style={styles.plateText}>
              PLATE 01
            </Text>
          </View>
        </View>

        {/* RESONANCE NOTE */}
        <View
          style={[
            styles.resonanceBox,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.resonanceHeadingRow}>
            <View style={styles.resonanceLabelRow}>
              <View style={styles.pinkDot} />

              <Text type="label" style={styles.smallLabel}>
                RESONANCE NOTE
              </Text>
            </View>

            <Text style={styles.concordanceText}>
              High Concordance
            </Text>
          </View>

          <Text style={styles.resonanceQuote}>
            “You both instinctively gravitate toward spontaneous weekend
            escapes over staying within the city walls.”
          </Text>
        </View>

        {/* BIO */}
        <View style={styles.section}>
          <Text type="label" style={styles.sectionLabel}>
            BIO & PERSONA
          </Text>

          <Text style={styles.bioText}>
            {bio}
          </Text>
        </View>

        {/* FUN QUESTION */}
        <View style={styles.section}>
          <Text type="label" style={styles.sectionLabel}>
            FUN QUESTION
          </Text>

          <View
            style={[
              styles.questionBox,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.questionText}>
              {funQuestion}
            </Text>

            <View
              style={[
                styles.questionDivider,
                { backgroundColor: theme.border },
              ]}
            />

            <Text style={styles.answerText}>
              “{funAnswer}”
            </Text>
          </View>
        </View>

        {/* SIGNATURES */}
        <View style={styles.section}>
          <Text type="label" style={styles.sectionLabel}>
            SIGNATURES & AESTHETIC TENDENCIES
          </Text>

          <View style={styles.tags}>
            {[
              'Coastal Hikes',
              'Filter Coffee',
              '35mm Film',
              'Scandinavian Design',
              'Vinyl',
            ].map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tag,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                ]}
              >
                <Text style={styles.tagText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* PHOTOGRAPHIC SALON */}
        {photos[1] && (
          <View style={styles.section}>
            <View style={styles.salonHeader}>
              <Text type="label" style={styles.sectionLabel}>
                PHOTOGRAPHIC SALON
              </Text>

              <Text style={styles.viewAll}>
                VIEW ALL (2)
              </Text>
            </View>

            <View style={styles.secondImageContainer}>
              <Image
                source={photos[1]}
                style={styles.secondImage}
                resizeMode="cover"
              />

              <View style={styles.secondImageShade} />

              <Text style={styles.secondPlate}>
                PLATE 02 · PHOTOGRAPHY
              </Text>
            </View>
          </View>
        )}

        {/* FRIENDS SAY */}
        <View style={[styles.section, styles.friendsSection]}>
          <Text type="label" style={styles.sectionLabel}>
            FRIENDS SAY
          </Text>

          <Text style={styles.friendsQuote}>
            “{friendsThink}”
          </Text>
        </View>
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    maxHeight: 640,
    borderRadius: Radius.xl,
    ...Shadows.subtle,
  },

  content: {
    paddingBottom: Spacing.five,
  },

  /* HERO */

  hero: {
    height: 390,
    position: 'relative',
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  heroTopRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  heroPill: {
    minHeight: 30,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(247,245,239,0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  heroPillText: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: '#24211F',
  },

  pinkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E9858D',
  },

  heroBottom: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  heroIdentity: {
    flexShrink: 1,
    paddingRight: 12,
  },

  heroName: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 39,
    lineHeight: 42,
    fontWeight: '400',
    letterSpacing: -1.1,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 8,
  },

  heroAge: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '400',
    color: '#FFFFFF',
  },

  heroLocation: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#FFFFFF',
    opacity: 0.92,
  },

  plateText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  /* RESONANCE */

  resonanceBox: {
    marginHorizontal: Spacing.four,
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },

  resonanceHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.three,
  },

  resonanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexShrink: 1,
  },

  smallLabel: {
    fontSize: 9,
    lineHeight: 12,
  },

  concordanceText: {
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.58,
  },

  resonanceQuote: {
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 25,
  },

  /* SECTIONS */

  section: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
  },

  sectionLabel: {
    opacity: 0.62,
  },

  bioText: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 18,
    lineHeight: 27,
  },

  /* QUESTION */

  questionBox: {
    marginTop: Spacing.three,
    padding: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
  },

  questionText: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '500',
  },

  questionDivider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: Spacing.three,
  },

  answerText: {
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 25,
    opacity: 0.75,
  },

  /* TAGS */

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.three,
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tagText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  /* PHOTO SALON */

  salonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },

  viewAll: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    opacity: 0.5,
  },

  secondImageContainer: {
    height: 320,
    marginTop: Spacing.three,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },

  secondImage: {
    width: '100%',
    height: '100%',
  },

  secondImageShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  secondPlate: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    color: '#FFFFFF',
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 5,
  },

  /* FRIENDS */

  friendsSection: {
    paddingBottom: Spacing.two,
  },

  friendsQuote: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 21,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
});