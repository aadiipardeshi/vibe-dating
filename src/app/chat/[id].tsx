import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Input, Screen, Text } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { getPerson, initialMessages } from '@/data/prototype';
import { useTheme } from '@/hooks/use-theme';
import { usePrototypeStore } from '@/store/prototype';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [draft, setDraft] = useState('');
  const messages = usePrototypeStore((state) => state.messages);
  const send = usePrototypeStore((state) => state.send);
  const threadRef = useRef<ScrollView>(null);
  useEffect(() => { setDraft(''); }, [id]);
  const person = getPerson(id);
  if (!person) return <Screen><Text type="bodySans">Conversation not found</Text><Button onPress={() => router.replace('/matches')}>Back to Chats</Button></Screen>;
  const thread = [...initialMessages(person), ...(messages[person.id] ?? [])];
  const sendDraft = () => { send(person.id, draft); setDraft(''); };

  return (
    <Screen contentStyle={styles.screen}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.canGoBack() ? router.back() : router.replace('/matches')} style={styles.back}>
            <Text type="bodySans" style={styles.backIcon}>‹</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={`View ${person.name}'s profile`} onPress={() => router.push({ pathname: '/match/[id]', params: { id: person.id } })} style={styles.identity}>
            <Avatar name={person.name} source={person.photos[0]} size={38} />
            <View style={styles.identityText}>
              <Text type="bodySans" style={styles.name} numberOfLines={1}>{person.name}</Text>
              <Text type="bodySans" tone="textSecondary" style={styles.meta}>{person.city} · Local chat</Text>
            </View>
          </Pressable>
        </View>
        <ScrollView
          ref={threadRef}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => threadRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => threadRef.current?.scrollToEnd({ animated: false })}
          style={styles.fill}
          contentContainerStyle={styles.thread}
          showsVerticalScrollIndicator={false}
        >
          {thread.map((message) => (
            <View key={message.id} style={[styles.message, { alignSelf: message.sent ? 'flex-end' : 'flex-start' }]}>
              <View style={[styles.bubble, { backgroundColor: message.sent ? theme.accent : theme.backgroundElement }]}>
                <Text type="bodySans" style={[styles.body, { color: message.sent ? theme.onAccent : theme.text }]}>{message.body}</Text>
              </View>
              <Text type="bodySans" tone="textSecondary" style={[styles.meta, { alignSelf: message.sent ? 'flex-end' : 'flex-start' }]}>{message.time}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={[styles.composer, { borderTopColor: theme.border, backgroundColor: theme.background }]}>
          <View style={styles.fill}>
            <Input value={draft} onChangeText={setDraft} accessibilityLabel="Message" placeholder="Message…" onSubmitEditing={sendDraft} returnKeyType="send" maxLength={2000} style={styles.input} />
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Send message" accessibilityState={{ disabled: !draft.trim() }} disabled={!draft.trim()} onPress={sendDraft} style={({ pressed }) => [styles.send, { backgroundColor: theme.accent, opacity: !draft.trim() ? 0.4 : pressed ? 0.75 : 1 }]}>
            <Text type="bodySans" style={{ color: theme.onAccent, fontSize: 22 }}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, paddingVertical: 0 },
  fill: { flex: 1, minHeight: 0 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.two, gap: Spacing.two, borderBottomWidth: StyleSheet.hairlineWidth },
  back: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 30, lineHeight: 34 },
  identity: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.three, minHeight: 44 },
  identityText: { flex: 1, minWidth: 0 },
  name: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  meta: { fontSize: 11, lineHeight: 16 },
  thread: { paddingVertical: Spacing.four, gap: Spacing.three },
  message: { maxWidth: '85%', gap: Spacing.one },
  bubble: { borderRadius: Radius.md, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two },
  body: { fontSize: 14, lineHeight: 21 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, borderTopWidth: StyleSheet.hairlineWidth, paddingVertical: Spacing.two },
  input: { fontSize: 14, lineHeight: 20, minHeight: 44 },
  send: { width: 44, height: 44, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
});
