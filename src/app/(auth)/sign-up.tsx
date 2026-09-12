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

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text type="caption" tone="accent">
          {Brand.city}
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
        <Input label="Password" secureTextEntry placeholder="Create a password" />
        <Button
          onPress={() => {
            signUp({
              id: 'local-user',
              email: email || null,
              phone: null,
              createdAt: new Date().toISOString(),
              lastSeenAt: null,
            });
            router.replace('/(onboarding)');
          }}>
          Continue
        </Button>
        <Link href="/(auth)/login" asChild>
          <Button variant="ghost">Already have an account?</Button>
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
