import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = 'One moment' }: LoadingStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={theme.accent} />
      <Text type="caption" tone="textSecondary">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
});
