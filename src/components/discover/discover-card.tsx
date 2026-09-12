import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import {
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type DiscoverCardProps = {
  height?: number;
  heightLabel: string;
  sex: string;
  lookingFor: string;
  city: string;
  resonance: number;
  note: string;
  tags: string[];
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
  height,
  heightLabel,
  sex,
  lookingFor,
  city,
  resonance,
  note,
  tags,
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
        { height },
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
          {photos[0] ? (
            <Image
              source={photos[0]}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.heroShade} />

          {/* TOP TAGS */}
          <View style={styles.heroTopRow}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>
                EXPLORER · {city.toUpperCase()}
              </Text>
            </View>

            <View style={styles.heroPill}>
              <View style={styles.pinkDot} />

              <Text style={styles.heroPillText}>
                {resonance}% RESONANCE
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
                {neighborhood.toUpperCase()} · {city.toUpperCase()}
              </Text>
            </View>
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
            “{note}”
          </Text>
        </View>

        {/* BIO */}
        <View style={styles.section}>
          <View style={styles.attributes}>
            {[heightLabel, sex, lookingFor].map((value, index) => (
              <View
                key={index}
                style={[
                  styles.attributePill,
                  { borderColor: theme.border, backgroundColor: theme.backgroundElement },
                ]}
              >
                <Text type="bodySans" style={styles.attributeText}>{value}</Text>
              </View>
            ))}
          </View>
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
                {
                  backgroundColor: theme.border,
                },
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
            {tags.map((tag) => (
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

        {/* NORMAL SECOND PROFILE PHOTO */}
        {photos[1] ? (
          <View
            style={[
              styles.profilePhotoSection,
              {
                backgroundColor: theme.backgroundElement,
              },
            ]}
          >
            <Image
              source={photos[1]}
              style={styles.profilePhoto}
              resizeMode="contain"
            />
          </View>
        ) : null}

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
    borderRadius: Radius.xl,
    ...Shadows.subtle,
  },

  content: {
    paddingBottom: Spacing.five,
  },

  /* HERO */

  hero: {
    aspectRatio: 0.9,
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
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },

  heroPill: {
    minHeight: 30,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  heroPillText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 8,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.6,
    color: Colors.light.text,
  },

  pinkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.accentMuted,
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
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: -1.1,
    color: Colors.light.onAccent,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },

  heroAge: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 25,
    lineHeight: 40,
    fontWeight: '600',
    color: Colors.light.onAccent,
  },

  heroLocation: {
    fontFamily: Typography.bodySans.fontFamily,
    marginTop: 2,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '500',
    letterSpacing: 1.1,
    color: Colors.light.onAccent,
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
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.three,
  },

  resonanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },

  smallLabel: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  concordanceText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 16,
    opacity: 0.58,
  },

  resonanceQuote: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.1,
  },

  /* GENERAL SECTIONS */

  section: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
  },

  sectionLabel: {
    opacity: 0.62,
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0.7,
  },

  attributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },

  attributePill: {
    maxWidth: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },

  attributeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },

  bioText: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.05,
  },

  /* FUN QUESTION */

  questionBox: {
    marginTop: Spacing.three,
    padding: Spacing.four,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
  },

  questionText: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 15,
    lineHeight: 20,
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
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
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
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  /* SECOND PROFILE PHOTO */

  profilePhotoSection: {
    marginHorizontal: Spacing.four,
    marginTop: Spacing.five,
    height: 430,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },

  profilePhoto: {
    width: '100%',
    height: '100%',
  },

  /* FRIENDS */

  friendsSection: {
    paddingBottom: Spacing.two,
  },

  friendsQuote: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
});
