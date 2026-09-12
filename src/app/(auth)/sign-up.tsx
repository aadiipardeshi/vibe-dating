import { usePrototypeStore } from '@/store/prototype';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Text } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

export default function SignUpScreen() {
  const signUp = useSessionStore((state) => state.signUp);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const updateProfile = usePrototypeStore((state) => state.updateProfile);
  const [error, setError] = useState('');

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="caption" tone="accent">
          {Brand.city.toUpperCase()} · PRIVATE EDITION
        </Text>
        <Text type="display">Join Vibe</Text>
        <Text tone="textSecondary">A few details now. Your lifestyle comes next.</Text>
      </View>

      <View style={styles.form}>
        <Input label="First name" value={name} onChangeText={setName} placeholder="Aaditya" />
        <Input
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
        />
        <Text type="bodySans" tone="textSecondary">A local preview. Your details stay in this app session; no account is created remotely.</Text>
        {error ? <Text type="bodySans" tone="accent" accessibilityLiveRegion="polite">{error}</Text> : null}
        <Button
          onPress={() => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email.'); return; }
            if (!name.trim()) { setError('Please enter your name.'); return; }
            updateProfile({ name: name.trim() });
            signUp({
              id: 'local-user',
              email: email.trim(),
              phone: null,
              createdAt: new Date().toISOString(),
              lastSeenAt: null,
            });
            router.replace('/(onboarding)');
          }}>
          CONTINUE
        </Button>
        <Link href="/(auth)/login" asChild>
          <Button variant="ghost">Already have an account?</Button>
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
