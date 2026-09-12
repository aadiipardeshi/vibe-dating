import { Stack } from 'expo-router';

import { useTheme } from '@/hooks/use-theme';

export default function MatchLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: theme.text,
        headerStyle: { backgroundColor: theme.background },
        contentStyle: { backgroundColor: theme.background },
        title: 'Match',
      }}
    />
  );
}
