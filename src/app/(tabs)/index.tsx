import { Colors } from '@/constants/theme';
import { people, accountPhoto } from '@/data/prototype';
import { usePrototypeStore } from '@/store/prototype';
import { Avatar, Button } from '@/components/ui';
import { EditorialModal } from '@/components/ui/editorial-modal';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  useWindowDimensions,
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

const SWIPE_THRESHOLD = 100;

export default function DiscoverScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [cardHeight, setCardHeight] = useState(420);
  const [surface, setSurface] = useState<'filters' | 'notifications' | 'resonance' | null>(null);
  const [highResonance, setHighResonance] = useState(false);
  const { decide, decisions, notificationsEnabled, profile: account } = usePrototypeStore();
  const profiles = highResonance ? people.filter((person) => person.resonance >= 90) : people;
  const animating = useRef(false);
  const [busy, setBusy] = useState(false);
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
    if (animating.current || !currentProfile) return;
    animating.current = true;
    setBusy(true);
    const destination =
      direction === 'right'
        ? width * 1.4
        : -width * 1.4;

    Animated.timing(position, {
      toValue: {
        x: destination,
        y: 0,
      },
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        decide(currentProfile.id, direction === 'right' ? 'like' : 'pass');
        moveToNextProfile();
      }
      animating.current = false;
      setBusy(false);
    });
  };

  const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesture) => {
        const horizontalMovement = Math.abs(gesture.dx);
        const verticalMovement = Math.abs(gesture.dy);

        return (
          !animating.current && horizontalMovement > verticalMovement &&
          horizontalMovement > 8
        );
      },

      onPanResponderMove: (_, gesture) => {
        if (animating.current) return;
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
        if (animating.current) return;
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }).start();
      },
    });

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
          <Button variant="ghost" onPress={() => router.push('/profile')}>YOUR PROFILE</Button>
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
            accessibilityRole="button"
            onPress={() => { setCurrentIndex(0); setHighResonance(false); }}
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
            disabled={busy}
            onPress={() => setSurface("filters")}
            accessibilityRole="button" accessibilityLabel="Discovery filters" hitSlop={8}
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
            onPress={() => setSurface("notifications")}
            accessibilityRole="button" accessibilityLabel="Activity notices" hitSlop={8}
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
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            style={[
              styles.profileCircle,
              {
                borderColor: theme.border,
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Avatar name={account.name} source={accountPhoto} size={38} />
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
      <View style={styles.cardArea} onLayout={(event) => setCardHeight(Math.max(1, event.nativeEvent.layout.height))}>
        {nextProfile && (
          <View style={styles.nextCard} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <DiscoverCard
              height={cardHeight}
              city={nextProfile.city}
              resonance={nextProfile.resonance}
              note={nextProfile.note}
              tags={nextProfile.tags}
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
            key={currentProfile.id}
            height={cardHeight}
            city={currentProfile.city}
            resonance={currentProfile.resonance}
            note={currentProfile.note}
            tags={currentProfile.tags}
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
          disabled={busy} accessibilityRole="button" accessibilityLabel="Pass on this profile"
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
          disabled={busy}
          onPress={() => setSurface("resonance")}
          accessibilityRole="button" accessibilityLabel="View resonance details"
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
          disabled={busy} accessibilityRole="button" accessibilityLabel="Like this profile"
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
      <EditorialModal visible={surface !== null} title={surface === 'filters' ? 'Your discovery preferences' : surface === 'notifications' ? 'A little activity' : 'A shared rhythm'} onClose={() => setSurface(null)}>
        {surface === 'filters' ? <>
          <Text>Curate the local selection by shared resonance.</Text>
          <Button variant={highResonance ? 'secondary' : 'primary'} onPress={() => { setHighResonance(false); setCurrentIndex(0); resetCard(); }}>ALL PROFILES</Button>
          <Button variant={highResonance ? 'primary' : 'secondary'} onPress={() => { setHighResonance(true); setCurrentIndex(0); resetCard(); }}>90% RESONANCE & ABOVE</Button>
          <Text type="bodySans" tone="textSecondary">{highResonance ? '1 profile' : '2 profiles'} in this local selection.</Text>
        </> : surface === 'notifications' ? <>
          <Text>{notificationsEnabled ? `Two conversations are waiting. You have liked ${Object.values(decisions).filter((value) => value === 'like').length} profiles this session.` : 'Activity notices are turned off in your profile preferences.'}</Text>
          <Button onPress={() => { setSurface(null); router.push('/matches'); }}>OPEN CHATS</Button>
        </> : <>
          <Text type="heading">{currentProfile.resonance}% resonance with {currentProfile.name}</Text>
          <Text>{currentProfile.note}</Text>
          <Text type="bodySans" tone="textSecondary">Illustrative compatibility for this local preview.</Text>
          <Button onPress={() => { setSurface(null); router.push({ pathname: '/match/[id]', params: { id: currentProfile.id } }); }}>VIEW DOSSIER</Button>
        </>}
      </EditorialModal>
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
    flexWrap: 'wrap',
    gap: Spacing.two,
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
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.45,
    opacity: 0.48,
  },

  discoverTitle: {
    fontFamily: Typography.bodySans.fontFamily,
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
    width: 44,
    height: 44,
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
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: Typography.bodySans.fontFamily,
    marginTop: 2,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.2,
    opacity: 0.5,
  },

  /* CARD STACK */

  cardArea: {
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
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
    color: Colors.light.accentMuted,
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
