import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button, Card, Screen, Text } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

const STEPS = [
  {
    title: 'How you spend a Sunday',
    body: 'Markets, long breakfasts, trail runs, or a quiet afternoon with a book.',
  },
  {
    title: 'Where you feel at home',
    body: 'Koregaon Park, Baner, Kalyani Nagar, Deccan — the corners of Pune that feel like yours.',
  },
  {
    title: 'What you want this to be',
    body: 'Dating, something lasting, or still figuring it out. No performance required.',
  },
];

export default function OnboardingScreen() {
  const completeOnboarding = useSessionStore((state) => state.completeOnboarding);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="caption" tone="accent">
          {Brand.name}
        </Text>
        <Text type="display">Set your vibe</Text>
        <Text tone="textSecondary">
          This is a placeholder for lifestyle onboarding. Nothing is saved yet.
        </Text>
      </View>

      <View style={styles.list}>
        {STEPS.map((step) => (
          <Card key={step.title}>
            <Text type="title">{step.title}</Text>
            <Text tone="textSecondary">{step.body}</Text>
          </Card>
        ))}
      </View>

      <Button
        onPress={() => {
          completeOnboarding();
          router.replace('/(tabs)');
        }}>
        Enter Discover
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  list: {
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
});
