import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { DiscoverCard } from '@/components/discover/discover-card';
import { Screen, Text } from '@/components/ui';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const { width } = Dimensions.get('window');

const SWIPE_THRESHOLD = 120;
const SWIPE_OUT_DISTANCE = width * 1.4;

const profilePic = require('@/assets/images/profilepic.jpg');
const profilePic2 = require('@/assets/images/profilepic2.jpg');

const profiles = [
  {
    id: '1',
    name: 'Aadi',
    age: 24,
    neighborhood: 'Koregaon Park',
    bio: 'Coffee, good conversations, discovering new places, and making plans that turn into great stories.',
    photos: [profilePic, profilePic2],
    funQuestion: 'My most controversial opinion is...',
    funAnswer: 'The best conversations happen after midnight.',
    friendsThink:
      'The person who can convince everyone to leave the house for a spontaneous adventure.',
  },
  {
    id: '2',
    name: 'Vibe Profile',
    age: 25,
    neighborhood: 'Pune',
    bio: 'Music, food, photography, and finding hidden spots around the city.',
    photos: [profilePic2, profilePic],
    funQuestion: 'A perfect Sunday looks like...',
    funAnswer: 'Good food, great music, and absolutely no plans.',
    friendsThink:
      'Always knows the best place to eat and somehow turns every plan into an adventure.',
  },
];

export default function DiscoverScreen() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const resetCard = () => {
    position.setValue({ x: 0, y: 0 });
  };

  const moveToNextProfile = () => {
    setCurrentIndex((index) => index + 1);
    resetCard();
  };

  const swipe = (direction: 'left' | 'right') => {
    const destination =
      direction === 'right'
        ? SWIPE_OUT_DISTANCE
        : -SWIPE_OUT_DISTANCE;

    Animated.timing(position, {
      toValue: {
        x: destination,
        y: 0,
      },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      moveToNextProfile();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesture) => {
        const horizontalMovement = Math.abs(gesture.dx);
        const verticalMovement = Math.abs(gesture.dy);

        return (
          horizontalMovement > verticalMovement &&
          horizontalMovement > 8
        );
      },

      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: 0,
        });
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipe('left');
        } else {
          Animated.spring(position, {
            toValue: {
              x: 0,
              y: 0,
            },
            friction: 7,
            tension: 60,
            useNativeDriver: true,
          }).start();
        }
      },

      onPanResponderTerminate: () => {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-9deg', '0deg', '9deg'],
  });

  const cardScale = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0.97, 1, 0.97],
    extrapolate: 'clamp',
  });

  if (!currentProfile) {
    return (
      <Screen contentStyle={styles.screen}>
        <View style={styles.empty}>
          <Text type="label" style={styles.emptyEyebrow}>
            PORTFOLIO COMPLETE
          </Text>

          <Text type="display" style={styles.emptyTitle}>
            You&apos;re all caught up.
          </Text>

          <Text
            type="body"
            tone="textSecondary"
            style={styles.emptyBody}
          >
            Your next curated profiles will appear here.
          </Text>

          <Pressable
            onPress={() => setCurrentIndex(0)}
            style={[
              styles.restartButton,
              {
                backgroundColor: theme.accent,
              },
            ]}
          >
            <Text
              type="label"
              style={{
                color: theme.onAccent,
              }}
            >
              START AGAIN
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen contentStyle={styles.screen}>
      {/* TOP MASTHEAD */}
      <View style={styles.masthead}>
        <View style={styles.brandBlock}>
          <Text style={styles.brandName}>
            VIBE
          </Text>

          <View
            style={[
              styles.brandDivider,
              { backgroundColor: theme.border },
            ]}
          />

          <View>
            <Text style={styles.issue}>
              ISSUE N° 04 ·
            </Text>

            <Text style={styles.discoverTitle}>
              DISCOVER
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            style={[
              styles.smallHeaderButton,
              {
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.headerIcon}>
              ≡
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.smallHeaderButton,
              {
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.headerIcon}>
              ♢
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.profileCircle,
              {
                borderColor: theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Text style={styles.profileCircleText}>
              V
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.headerRule,
          { backgroundColor: theme.border },
        ]}
      />

      {/* DOSSIER HEADER */}
      <View style={styles.dossier}>
        <View>
          <Text type="label" style={styles.dossierLabel}>
            PORTFOLIO DOSSIER
          </Text>
        </View>

        <View style={styles.dossierRight}>
          <Text style={styles.curatedText}>
            curated for you
          </Text>

          <Text style={styles.profileCount}>
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(profiles.length).padStart(2, '0')}
          </Text>
        </View>
      </View>

      {/* CARD STACK */}
      <View style={styles.cardArea}>
        {nextProfile && (
          <View style={styles.nextCard}>
            <DiscoverCard
              name={nextProfile.name}
              age={nextProfile.age}
              neighborhood={nextProfile.neighborhood}
              bio={nextProfile.bio}
              photos={nextProfile.photos}
              funQuestion={nextProfile.funQuestion}
              funAnswer={nextProfile.funAnswer}
              friendsThink={nextProfile.friendsThink}
            />
          </View>
        )}

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.swipeCard,
            {
              transform: [
                ...position.getTranslateTransform(),
                { rotate },
                { scale: cardScale },
              ],
            },
          ]}
        >
          <DiscoverCard
            name={currentProfile.name}
            age={currentProfile.age}
            neighborhood={currentProfile.neighborhood}
            bio={currentProfile.bio}
            photos={currentProfile.photos}
            funQuestion={currentProfile.funQuestion}
            funAnswer={currentProfile.funAnswer}
            friendsThink={currentProfile.friendsThink}
          />
        </Animated.View>
      </View>

      {/* FLOATING ACTION BAR */}
      <View
        style={[
          styles.actionDock,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
          Shadows.floating,
        ]}
      >
        <Pressable
          onPress={() => swipe('left')}
          style={({ pressed }) => [
            styles.actionButton,
            styles.passButton,
            {
              borderColor: theme.border,
              backgroundColor: theme.surface,
              opacity: pressed ? 0.65 : 1,
            },
          ]}
        >
          <Text style={styles.passIcon}>
            ×
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.discoveryButton,
            {
              backgroundColor: theme.backgroundElement,
              opacity: pressed ? 0.65 : 1,
            },
          ]}
        >
          <Text style={styles.discoveryIcon}>
            ✦
          </Text>
        </Pressable>

        <Pressable
          onPress={() => swipe('right')}
          style={({ pressed }) => [
            styles.actionButton,
            styles.likeButton,
            {
              backgroundColor: theme.accent,
              opacity: pressed ? 0.82 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.likeIcon,
              { color: theme.onAccent },
            ]}
          >
            ♥
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },

  /* HEADER */

  masthead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 54,
  },

  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandName: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 2.5,
  },

  brandDivider: {
    width: StyleSheet.hairlineWidth,
    height: 29,
    marginHorizontal: 12,
  },

  issue: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '600',
    letterSpacing: 1.45,
    opacity: 0.48,
  },

  discoverTitle: {
    marginTop: 1,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 2.2,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  smallHeaderButton: {
    width: 31,
    height: 31,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIcon: {
    fontSize: 16,
    lineHeight: 18,
    opacity: 0.68,
  },

  profileCircle: {
    width: 33,
    height: 33,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCircleText: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
  },

  headerRule: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    marginTop: 8,
  },

  /* DOSSIER */

  dossier: {
    marginTop: Spacing.three,
    marginBottom: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  dossierLabel: {
    opacity: 0.56,
  },

  dossierRight: {
    alignItems: 'flex-end',
  },

  curatedText: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 12,
    lineHeight: 15,
    fontStyle: 'italic',
    opacity: 0.55,
  },

  profileCount: {
    marginTop: 2,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    opacity: 0.5,
  },

  /* CARD STACK */

  cardArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
  },

  swipeCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  nextCard: {
    position: 'absolute',
    left: 8,
    right: 8,
    top: 8,
    transform: [{ scale: 0.975 }],
    opacity: 0.45,
  },

  /* ACTION BAR */

  actionDock: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.three,
    marginBottom: 2,
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },

  passButton: {
    width: 48,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
  },

  discoveryButton: {
    width: 44,
    height: 44,
  },

  likeButton: {
    width: 52,
    height: 52,
  },

  passIcon: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '300',
    opacity: 0.6,
  },

  discoveryIcon: {
    fontSize: 19,
    lineHeight: 22,
    color: '#E9858D',
  },

  likeIcon: {
    fontSize: 20,
    lineHeight: 23,
  },

  /* EMPTY STATE */

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },

  emptyEyebrow: {
    opacity: 0.55,
    marginBottom: Spacing.three,
  },

  emptyTitle: {
    textAlign: 'center',
  },

  emptyBody: {
    marginTop: Spacing.three,
    textAlign: 'center',
    maxWidth: 300,
  },

  restartButton: {
    marginTop: Spacing.five,
    minHeight: 48,
    paddingHorizontal: Spacing.five,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});