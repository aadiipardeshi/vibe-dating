import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';

type ProfileHeaderProps = {
  name: string;
  neighborhood: string;
  bio: string;
};

export function ProfileHeader({ name, neighborhood, bio }: ProfileHeaderProps) {
  return (
    <View style={styles.wrap}>
      <Avatar name={name} size={88} />
      <Text type="title">{name}</Text>
      <Text type="caption" tone="textSecondary">
        {neighborhood}
      </Text>
      <Text style={styles.bio} tone="textSecondary">
        {bio}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  bio: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
