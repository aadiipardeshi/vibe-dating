import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Input, Screen, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useSessionStore } from '@/store/session';
import { usePrototypeStore } from '@/store/prototype';

export default function OnboardingScreen() {
  const completeOnboarding = useSessionStore((state) => state.completeOnboarding);
  const { profile, updateProfile } = usePrototypeStore();
  const [draft, setDraft] = useState(profile);
  const valid = draft.location.trim() && Number.isInteger(Number(draft.age)) && Number(draft.age) >= 18 && Number(draft.age) <= 100;
  return <Screen scroll>
    <View style={styles.header}>
      <Text type="label" tone="textSecondary">VIBE · YOUR FIRST EDITION</Text>
      <Text type="display">A little more you.</Text>
      <Text tone="textSecondary">The rituals, places and possibilities that make a connection personal.</Text>
    </View>
    <View style={styles.list}>
      <Card><View style={styles.list}>
        <Text type="label">01 · YOUR WORLD</Text>
        <Input label="Age · 18 or older" keyboardType="number-pad" maxLength={3} value={draft.age} onChangeText={(age) => setDraft({ ...draft, age })} />
        <Input label="Where you feel at home" value={draft.location} onChangeText={(location) => setDraft({ ...draft, location })} />
      </View></Card>
      <Card><View style={styles.list}>
        <Text type="label">02 · YOUR SUNDAY</Text>
        {['Slow weekends, spontaneous travel', 'Markets, art and long lunches', 'Trail runs and coffee walks'].map((lifestyle) => <Button key={lifestyle} variant={draft.lifestyle === lifestyle ? 'primary' : 'ghost'} onPress={() => setDraft({ ...draft, lifestyle })}>{lifestyle}</Button>)}
      </View></Card>
      <Card><View style={styles.list}>
        <Text type="label">03 · THE POSSIBILITY</Text>
        {['A lasting connection', 'Dating and discovery', 'Still figuring it out'].map((intent) => <Button key={intent} variant={draft.intent === intent ? 'primary' : 'ghost'} onPress={() => setDraft({ ...draft, intent })}>{intent}</Button>)}
      </View></Card>
      <Text type="bodySans" tone="textSecondary">Your choices shape your local profile. You can edit them later.</Text>
      <Button disabled={!valid} onPress={() => { updateProfile(draft); completeOnboarding(); router.replace('/(tabs)'); }}>ENTER DISCOVER</Button>
    </View>
  </Screen>;
}
const styles = StyleSheet.create({ header: { gap: Spacing.three, paddingTop: Spacing.five, marginBottom: Spacing.five }, list: { gap: Spacing.three } });
