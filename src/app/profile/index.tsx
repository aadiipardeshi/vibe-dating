import { StyleSheet, View } from 'react-native';

import { ProfileHeader } from '@/components/profile/profile-header';
import { Button, Screen, Text } from '@/components/ui';
import { Brand } from '@/constants/brand';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';

export default function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);

  return (
    <Screen scroll>
      <ProfileHeader
        name={user?.email?.split('@')[0] ?? 'You'}
        neighborhood={`${Brand.city}, ${Brand.country}`}
        bio="Your photos, rituals, and neighborhoods will live here. Nothing is synced yet."
      />

      <View style={styles.note}>
        <Text type="caption" tone="textSecondary">
          Signed in locally
          {user?.email ? ` as ${user.email}` : ''}.
        </Text>
      </View>

      <Button variant="secondary" onPress={signOut}>
        Sign out
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    marginVertical: Spacing.five,
    alignItems: 'center',
  },
});
