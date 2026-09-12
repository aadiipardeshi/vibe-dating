import '@/global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import * as SystemUI from 'expo-system-ui';

import { AppProviders } from '@/providers/app-providers';
import { useSessionStore } from '@/store/session';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  useEffect(() => { void SystemUI.setBackgroundColorAsync(theme.background); }, [theme.background]);
  const user = useSessionStore((state) => state.user);
  const onboardingComplete = useSessionStore((state) => state.onboardingComplete);
  const isSignedIn = Boolean(user);

  return (
    <ThemeProvider value={{ ...navigationTheme, colors: { ...navigationTheme.colors, primary: theme.accent, background: theme.background, card: theme.surface, text: theme.text, border: theme.border, notification: theme.accentMuted } }}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isSignedIn && !onboardingComplete}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>

        <Stack.Protected guard={isSignedIn && onboardingComplete}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="match" />
          <Stack.Screen name="chat" />
        </Stack.Protected>
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
