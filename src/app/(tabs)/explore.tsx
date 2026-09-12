import { Image, StyleSheet, View } from 'react-native';

import { Screen, Text } from '@/components/ui';
import {
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const profilePic = require('@/assets/images/profilepic.jpg');
const profilePic2 = require('@/assets/images/profilepic2.jpg');

export default function ExploreScreen() {
  const theme = useTheme();

  return (
    <Screen scroll>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>
            VIBE JOURNAL
          </Text>

          <Text style={styles.title}>
            Feed
          </Text>
        </View>

        <Text style={styles.issue}>
          ISSUE N° 04
        </Text>
      </View>

      <View
        style={[
          styles.divider,
          { backgroundColor: theme.border },
        ]}
      />

      {/* INTRO */}
      <View style={styles.intro}>
        <Text type="label" style={styles.sectionLabel}>
          PEOPLE · PLACES · MOMENTS
        </Text>

        <Text style={styles.introText}>
          A quiet collection of places, rituals and moments
          shaping the people around you.
        </Text>
      </View>

      {/* FEATURED STORY */}
      <View style={styles.feature}>
        <Image
          source={profilePic}
          style={styles.featureImage}
          resizeMode="cover"
        />

        <View style={styles.featureOverlay} />

        <View style={styles.featureTop}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              CITY NOTE · PUNE
            </Text>
          </View>
        </View>

        <View style={styles.featureBottom}>
          <Text style={styles.featureKicker}>
            EVENING RITUALS
          </Text>

          <Text style={styles.featureTitle}>
            Long walks, late coffee,
            and nowhere urgent to be.
          </Text>
        </View>
      </View>

      {/* EDITORIAL NOTE */}
      <View style={styles.editorialSection}>
        <Text type="label" style={styles.sectionLabel}>
          EDITORIAL NOTE
        </Text>

        <Text style={styles.editorialText}>
          The best connections rarely begin with a checklist.
          They start with noticing how someone moves through
          ordinary life.
        </Text>
      </View>

      {/* SECOND STORY */}
      <View style={styles.story}>
        <Image
          source={profilePic2}
          style={styles.storyImage}
          resizeMode="cover"
        />

        <View style={styles.storyContent}>
          <Text style={styles.storyMeta}>
            WEEKEND DISPATCH · MULSHI
          </Text>

          <Text style={styles.storyTitle}>
            A slow Saturday outside the city.
          </Text>

          <Text
            style={[
              styles.storyBody,
              { color: theme.textSecondary },
            ]}
          >
            Open roads, quiet cafés and the kind of plans
            that become better when nobody is checking the time.
          </Text>
        </View>
      </View>

      {/* SMALL FEATURE ROW */}
      <View style={styles.smallFeature}>
        <View style={styles.smallFeatureNumber}>
          <Text style={styles.number}>
            03
          </Text>
        </View>

        <View style={styles.smallFeatureContent}>
          <Text type="label" style={styles.sectionLabel}>
            THE VIBE INDEX
          </Text>

          <Text style={styles.smallFeatureTitle}>
            What people are choosing this week
          </Text>

          <View style={styles.tags}>
            {[
              'Coffee Walks',
              'Film Photos',
              'Sunday Drives',
              'Bookshops',
            ].map((tag) => (
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
        </View>
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
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    opacity: 0.5,
    marginBottom: 4,
  },

  title: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 40,
    lineHeight: 43,
    fontWeight: '400',
    letterSpacing: -1,
  },

  issue: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    opacity: 0.48,
    marginBottom: 6,
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
    marginTop: Spacing.three,
    maxWidth: 330,
    fontFamily: Typography.body.fontFamily,
    fontSize: 19,
    lineHeight: 28,
  },

  feature: {
    height: 430,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    position: 'relative',
  },

  featureImage: {
    width: '100%',
    height: '100%',
  },

  featureOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  featureTop: {
    position: 'absolute',
    top: 16,
    left: 16,
  },

  pill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(247,245,239,0.92)',
  },

  pillText: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#24211F',
  },

  featureBottom: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 20,
  },

  featureKicker: {
    color: '#FFFFFF',
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    opacity: 0.9,
  },

  featureTitle: {
    marginTop: 7,
    color: '#FFFFFF',
    fontFamily: Typography.display.fontFamily,
    fontSize: 31,
    lineHeight: 35,
    letterSpacing: -0.7,
    maxWidth: 310,
  },

  editorialSection: {
    paddingVertical: Spacing.five,
  },

  editorialText: {
    marginTop: Spacing.three,
    fontFamily: Typography.body.fontFamily,
    fontStyle: 'italic',
    fontSize: 20,
    lineHeight: 30,
  },

  story: {
    marginBottom: Spacing.six,
  },

  storyImage: {
    width: '100%',
    height: 250,
    borderRadius: Radius.lg,
  },

  storyContent: {
    paddingTop: Spacing.three,
  },

  storyMeta: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    opacity: 0.48,
  },

  storyTitle: {
    marginTop: 7,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 25,
    lineHeight: 31,
    letterSpacing: -0.4,
  },

  storyBody: {
    marginTop: Spacing.two,
    fontFamily: Typography.body.fontFamily,
    fontSize: 16,
    lineHeight: 24,
  },

  smallFeature: {
    flexDirection: 'row',
    gap: Spacing.four,
    paddingBottom: Spacing.six,
  },

  smallFeatureNumber: {
    width: 45,
  },

  number: {
    fontFamily: Typography.display.fontFamily,
    fontSize: 28,
    lineHeight: 32,
    opacity: 0.3,
  },

  smallFeatureContent: {
    flex: 1,
  },

  smallFeatureTitle: {
    marginTop: Spacing.two,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 21,
    lineHeight: 27,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Spacing.three,
  },

  tag: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
  },

  tagText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
  },
});