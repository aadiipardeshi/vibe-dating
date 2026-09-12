import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text type="caption" tone="accent">
          {Brand.launchLine}
        </Text>
        <Text type="display">{Brand.name}</Text>
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
          <Button>Create account</Button>
        </Link>
        <Link href="/(auth)/login" asChild>
          <Button variant="secondary">Log in</Button>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
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
