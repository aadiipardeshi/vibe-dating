import { Image } from 'expo-image';
import { accountPhoto } from '@/data/prototype';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <Screen scroll>
      <Image source={accountPhoto} style={{ width: "100%", aspectRatio: 1.3, borderRadius: 16 }} contentFit="cover" accessibilityLabel="VIBE editorial portrait" />
      <View style={styles.hero}>
        <Text type="caption" tone="accent">
          {Brand.launchLine.toUpperCase()} · PRIVATE EDITION
        </Text>
        <Text type="display">VIBE</Text>
        <Text type="title" tone="textSecondary" style={styles.tagline}>
          {Brand.tagline}
        </Text>
      </View>

      <View style={styles.actions}>
        <Text tone="textSecondary" style={styles.city}>
          Dating through the way you actually live — cafes in Baner, runs along the river, late
          dinners in Koregaon Park.
        </Text>
        <Link href="/(auth)/sign-up" asChild>
          <Button>CREATE ACCOUNT</Button>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Button variant="secondary">LOG IN</Button>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: Spacing.five,
    justifyContent: 'flex-end',
    gap: Spacing.two,
    paddingBottom: Spacing.five,
  },
  tagline: {
    fontWeight: '400',
  },
  city: {
    marginBottom: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
  },
});
