import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { accountPhoto } from '@/data/prototype';

type ProfileHeaderProps = { name: string; age?: string; neighborhood: string; bio: string };
export function ProfileHeader({ name, age, neighborhood, bio }: ProfileHeaderProps) {
  return (
    <View style={styles.wrap}>
      <Image source={accountPhoto} accessibilityLabel="Your profile photograph" style={styles.photo} contentFit="cover" />
      <Text type="title">{name}{age ? `, ${age}` : ''}</Text>
      <Text type="bodySans" tone="textSecondary" style={styles.bio}>{neighborhood}</Text>
      <Text type="bodySans" style={styles.bio} tone="textSecondary">{bio}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { gap: Spacing.three },
  photo: { width: '100%', aspectRatio: 1.4, borderRadius: Radius.lg, marginBottom: Spacing.three },
  bio: { fontSize: 14, lineHeight: 21 },
});
