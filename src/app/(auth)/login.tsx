import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

export default function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);
  const [email, setEmail] = useState('');

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="caption" tone="accent">
          Welcome back
        </Text>
        <Text type="display">Log in</Text>
        <Text tone="textSecondary">Supabase auth will replace this local session later.</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
        />
        <Input label="Password" secureTextEntry placeholder="Your password" />
        <Button
          onPress={() => {
            signIn({
              id: 'local-user',
              email: email || null,
              phone: null,
              createdAt: new Date().toISOString(),
              lastSeenAt: new Date().toISOString(),
            });
            router.replace('/(tabs)');
          }}>
          Continue
        </Button>
        <Link href="/(auth)/sign-up" asChild>
          <Button variant="ghost">Need an account?</Button>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  form: {
    gap: Spacing.three,
  },
});
