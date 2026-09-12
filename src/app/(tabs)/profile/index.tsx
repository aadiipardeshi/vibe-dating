import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { ProfileHeader } from '@/components/profile/profile-header';
import { Button, Card, Input, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useSessionStore } from '@/store/session';
import { type LocalProfile, usePrototypeStore } from '@/store/prototype';

export default function ProfileScreen() {
  const theme = useTheme();
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);
  const { profile, updateProfile, notificationsEnabled, setNotifications, reset } = usePrototypeStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const valid = draft.name.trim() && draft.location.trim() && Number.isInteger(Number(draft.age)) && Number(draft.age) >= 18 && Number(draft.age) <= 100;
  const fields: { key: keyof LocalProfile; label: string }[] = [
    { key: 'name', label: 'Name' }, { key: 'age', label: 'Age' }, { key: 'location', label: 'Location' },
    { key: 'bio', label: 'Biography' }, { key: 'interests', label: 'Interests' },
    { key: 'lifestyle', label: 'Lifestyle' }, { key: 'intent', label: 'Looking for' },
  ];
  return (
    <Screen scroll>
      <Text type="bodySans" accessibilityRole="header" style={styles.title}>Profile</Text>
      <ProfileHeader name={profile.name} age={profile.age} neighborhood={profile.location} bio={profile.bio} />
      <View style={styles.sections}>
        {editing ? (
          <Card>
            <View style={styles.sections}>
              <Text type="bodySans" style={styles.heading}>Edit profile</Text>
              {fields.map(({ key, label }) => <Input key={key} label={label} value={draft[key]} multiline={key === 'bio'} keyboardType={key === 'age' ? 'number-pad' : 'default'} maxLength={key === 'age' ? 3 : key === 'bio' ? 400 : 160} onChangeText={(value) => setDraft((previous) => ({ ...previous, [key]: value }))} />)}
              <Text type="bodySans" tone="textSecondary">Name and location are required. Age must be 18–100. Changes last for this app session.</Text>
              <Button disabled={!valid} onPress={() => { updateProfile(draft); setEditing(false); setSaved(true); }}>Save profile</Button>
              <Button variant="ghost" onPress={() => setEditing(false)}>Cancel</Button>
            </View>
          </Card>
        ) : <Button variant="ghost" onPress={() => { setDraft(profile); setEditing(true); setSaved(false); }}>Edit profile</Button>}
        {saved && <Text accessibilityLiveRegion="polite" type="bodySans" tone="success">Your local profile has been updated.</Text>}
        <View><Text type="bodySans" style={styles.heading}>Interests</Text><Text type="bodySans" style={styles.copy}>{profile.interests || 'Add your interests.'}</Text></View>
        <View><Text type="bodySans" style={styles.heading}>Lifestyle</Text><Text type="bodySans" style={styles.copy}>{profile.lifestyle}</Text><Text type="bodySans" style={[styles.heading, styles.copy]}>Looking for</Text><Text type="bodySans" style={styles.copy}>{profile.intent}</Text></View>
        <View style={[styles.account, { borderColor: theme.border }]}>
          <Text type="bodySans" style={styles.heading}>Settings</Text>
          <Text type="bodySans" tone="textSecondary">{user?.email ?? 'Local guest account'}</Text>
          <View style={styles.setting}><Text type="bodySans" style={{ flex: 1 }}>Show local activity notices</Text><Switch accessibilityLabel="Show local activity notices" value={notificationsEnabled} onValueChange={setNotifications} trackColor={{ true: theme.accentMuted, false: theme.border }} /></View>
          <Text type="bodySans" tone="textSecondary">Changes are saved for this session only.</Text>
          <Button variant="secondary" onPress={() => { reset(); signOut(); }}>Sign out</Button>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600', marginBottom: Spacing.four },
  heading: { fontSize: 15, lineHeight: 21, fontWeight: '600' },
  sections: { gap: Spacing.four, marginTop: Spacing.four },
  copy: { marginTop: Spacing.two, fontSize: 14, lineHeight: 21 },
  account: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: Spacing.four, gap: Spacing.three, marginBottom: Spacing.five },
  setting: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
});
