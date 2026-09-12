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
    { key: 'bio', label: 'Biography' }, { key: 'interests', label: 'Signatures' },
    { key: 'lifestyle', label: 'Your rhythm' }, { key: 'intent', label: 'Looking for' },
  ];
  return (
    <Screen scroll>
      <View style={styles.masthead}><Text type="label">VIBE · PRIVATE DOSSIER</Text><Text type="caption" tone="textTertiary">PROFILE 01</Text></View>
      <ProfileHeader name={profile.name} age={profile.age} neighborhood={profile.location} bio={profile.bio} />
      <View style={styles.sections}>
        <Text type="label" tone="textSecondary">YOUR PERSONAL EDITION</Text>
        <Text type="bodySans" tone="textSecondary">{Object.values(profile).filter((value) => value.trim()).length} / 7 details completed · Local profile</Text>
        {editing ? (
          <Card>
            <View style={styles.sections}>
              <Text type="heading">Make it yours.</Text>
              {fields.map(({ key, label }) => <Input key={key} label={label} value={draft[key]} multiline={key === 'bio'} keyboardType={key === 'age' ? 'number-pad' : 'default'} maxLength={key === 'age' ? 3 : key === 'bio' ? 400 : 160} onChangeText={(value) => setDraft((previous) => ({ ...previous, [key]: value }))} />)}
              <Text type="bodySans" tone="textSecondary">Name and location are required. Age must be 18–100. Changes last for this app session.</Text>
              <Button disabled={!valid} onPress={() => { updateProfile(draft); setEditing(false); setSaved(true); }}>SAVE PROFILE</Button>
              <Button variant="ghost" onPress={() => setEditing(false)}>CANCEL</Button>
            </View>
          </Card>
        ) : <Button variant="ghost" onPress={() => { setDraft(profile); setEditing(true); setSaved(false); }}>EDIT PROFILE</Button>}
        {saved && <Text accessibilityLiveRegion="polite" type="bodySans" tone="success">Your local profile has been updated.</Text>}
        <Card><Text type="label" tone="textSecondary">SIGNATURES</Text><Text style={styles.copy}>{profile.interests || 'Add the things that feel like you.'}</Text></Card>
        <Card><Text type="label" tone="textSecondary">YOUR RHYTHM</Text><Text style={styles.copy}>{profile.lifestyle}</Text><Text type="label" tone="textSecondary" style={styles.copy}>LOOKING FOR</Text><Text style={styles.copy}>{profile.intent}</Text></Card>
        <View style={[styles.account, { borderColor: theme.border }]}>
          <Text type="heading">Account & preferences</Text>
          <Text type="bodySans" tone="textSecondary">{user?.email ?? 'Local guest account'}</Text>
          <View style={styles.setting}><Text type="bodySans" style={{ flex: 1 }}>Show local activity notices</Text><Switch accessibilityLabel="Show local activity notices" value={notificationsEnabled} onValueChange={setNotifications} trackColor={{ true: theme.accentMuted, false: theme.border }} /></View>
          <Text type="bodySans" tone="textSecondary">A private preview of VIBE. Profile edits, likes and messages are stored only for this session.</Text>
          <Button variant="secondary" onPress={() => { reset(); signOut(); }}>SIGN OUT</Button>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  masthead: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.five },
  sections: { gap: Spacing.four, marginTop: Spacing.four },
  copy: { marginTop: Spacing.three },
  account: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: Spacing.five, gap: Spacing.four, marginBottom: Spacing.five },
  setting: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
});
