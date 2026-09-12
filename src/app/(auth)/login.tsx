import { usePrototypeStore } from '@/store/prototype';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

export default function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);
  const [email, setEmail] = useState('');
  const updateProfile = usePrototypeStore((state) => state.updateProfile);
  const [error, setError] = useState('');

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="caption" tone="accent">
          VIBE · WELCOME BACK
        </Text>
        <Text type="display">Log in</Text>
        <Text tone="textSecondary">Your next chapter starts with a conversation.</Text>
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
        <Text type="bodySans" tone="textSecondary">Local preview · Enter an email to explore. No password required.</Text>
        {error ? <Text type="bodySans" tone="accent" accessibilityLiveRegion="polite">{error}</Text> : null}
        <Button
          onPress={() => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email.'); return; }
            updateProfile({ name: email.trim().split('@')[0] });
            signIn({
              id: 'local-user',
              email: email.trim(),
              phone: null,
              createdAt: new Date().toISOString(),
              lastSeenAt: new Date().toISOString(),
            });
            router.replace('/(tabs)');
          }}>
          CONTINUE
        </Button>
        <Link href="/(auth)/sign-up" asChild>
          <Button variant="ghost">Need an account?</Button>
        </Link>
        <Link href="/(auth)" asChild><Button variant="ghost">BACK TO WELCOME</Button></Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.three,
    paddingTop: Spacing.seven,
    marginBottom: Spacing.six,
  },
  form: {
    gap: Spacing.three,
  },
});
