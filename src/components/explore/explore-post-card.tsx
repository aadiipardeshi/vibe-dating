import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ExplorePostCardProps = {
  place: string;
  title: string;
  body: string;
};

export function ExplorePostCard({ place, title, body }: ExplorePostCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <View style={[styles.media, { backgroundColor: theme.backgroundElement }]} />
      <View style={styles.copy}>
        <Text type="caption" tone="accent">
          {place}
        </Text>
        <Text type="title">{title}</Text>
        <Text tone="textSecondary">{body}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  media: {
    height: 160,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  copy: {
    padding: Spacing.four,
    gap: Spacing.one,
  },
});
