import { useEffect, useRef, useState } from 'react';
import { getPerson, initialMessages } from '@/data/prototype';
import { usePrototypeStore } from '@/store/prototype';
import { Button } from '@/components/ui/button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [draft, setDraft] = useState('');
  useEffect(() => { setDraft(''); }, [id]);
  const messages = usePrototypeStore((state) => state.messages);
  const send = usePrototypeStore((state) => state.send);
  const threadRef = useRef<ScrollView>(null);
  const person = getPerson(id);
  if (!person) return <Screen><Text type="title">Conversation not found</Text><Button onPress={() => router.replace('/matches')}>BACK TO CHATS</Button></Screen>;
  const thread = [...initialMessages(person), ...(messages[person.id] ?? [])];
  const sendDraft = () => { send(person.id, draft); setDraft(''); };

  return (
    <Screen contentStyle={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button" accessibilityLabel="Go back" hitSlop={8}
          onPress={() => router.canGoBack() ? router.back() : router.replace("/matches")}
          style={({ pressed }) => [
            styles.headerButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <View style={styles.headerIdentity}>
          <Avatar
            name={person.name} source={person.photos[0]}
            size={38}
          />

          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.headerName}>
                {person.name}
              </Text>

              <View
                style={[
                  styles.activeDot,
                  {
                    backgroundColor: theme.accentMuted,
                  },
                ]}
              />
            </View>

            <Text style={styles.headerMeta}>
              {person.resonance}% RESONANCE · {person.city.toUpperCase()}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push({ pathname: "/match/[id]", params: { id: person.id } })}
          accessibilityRole="button" accessibilityLabel="View profile dossier"
          style={({ pressed }) => [
            styles.headerButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text style={styles.moreIcon}>
            ↗
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.headerDivider,
          {
            backgroundColor: theme.border,
          },
        ]}
      />

      {/* THREAD */}
      <ScrollView
        ref={threadRef}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => threadRef.current?.scrollToEnd({ animated: true })}
        style={styles.thread}
        contentContainerStyle={styles.threadContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.threadIntro}>
          <Text type="label" style={styles.threadLabel}>
            CONVERSATION · {person.name.toUpperCase()}
          </Text>

          <Text style={styles.threadTitle}>
            A quiet beginning.
          </Text>

          <Text
            style={[
              styles.threadSubtitle,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            {person.note}
          </Text>
        </View>

        {/* DATE PROMPT */}
        <View
          style={[
            styles.promptCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
            Shadows.subtle,
          ]}
        >
          <View style={styles.promptHeader}>
            <View
              style={[
                styles.promptDot,
                {
                  backgroundColor: theme.accentMuted,
                },
              ]}
            />

            <Text type="label" style={styles.promptLabel}>
              VIBE SUGGESTION
            </Text>
          </View>

          <Text style={styles.promptTitle}>
            Take the conversation offline?
          </Text>

          <Text
            style={[
              styles.promptBody,
              {
                color: theme.textSecondary,
              },
            ]}
          >
            {person.dateIdea}
          </Text>

          <Pressable
            onPress={() => setDraft(person.dateIdea)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.promptButton,
              {
                backgroundColor: theme.accent,
                opacity: pressed ? 0.82 : 1,
              },
            ]}
          >
            <Text
              type="label"
              style={{
                color: theme.onAccent,
              }}
            >
              DRAFT A DATE INVITATION
            </Text>
          </Pressable>
        </View>

        <View style={styles.dateRow}>
          <View
            style={[
              styles.dateLine,
              {
                backgroundColor: theme.border,
              },
            ]}
          />

          <Text
            style={[
              styles.dateText,
              {
                color: theme.textTertiary,
              },
            ]}
          >
            TODAY
          </Text>

          <View
            style={[
              styles.dateLine,
              {
                backgroundColor: theme.border,
              },
            ]}
          />
        </View>

        {thread.map((message) => (
          <View key={message.id} style={message.sent ? styles.sentRow : styles.receivedRow}>
            {!message.sent && <Avatar name={person.name} source={person.photos[0]} size={30} />}
            <View style={message.sent ? styles.sentContent : styles.receivedContent}>
              <View style={[message.sent ? styles.sentBubble : styles.receivedBubble, { backgroundColor: message.sent ? theme.accent : theme.backgroundElement, borderColor: theme.border }]}>
                <Text style={[styles.messageText, { color: message.sent ? theme.onAccent : theme.text }]}>{message.body}</Text>
              </View>
              <Text type="caption" tone="textTertiary" style={{ marginTop: 6 }}>{message.time}{message.sent ? ' · LOCAL' : ''}</Text>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* COMPOSER */}
      <View
        style={[
          styles.composerWrap,
          {
            borderTopColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
      >
        <View style={styles.composer}>
          <View style={styles.inputWrap}>
            <Input
              value={draft}
              onChangeText={setDraft}
              accessibilityLabel="Message"
              onSubmitEditing={sendDraft}
              returnKeyType="send"
              placeholder="Write something unhurried"
            />
          </View>

          <Pressable
            onPress={sendDraft}
            disabled={!draft.trim()}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: theme.accent,
                opacity: !draft.trim() ? 0.4 : pressed ? 0.78 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.sendArrow,
                {
                  color: theme.onAccent,
                },
              ]}
            >
              ↑
            </Text>
          </Pressable>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 0,
  },

  /* HEADER */

  header: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    marginTop: -2,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 30,
    lineHeight: 31,
    fontWeight: '300',
  },

  moreIcon: {
    marginTop: -6,
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 1,
  },

  headerIdentity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  headerName: {
    fontFamily: Typography.heading.fontFamily,
    fontSize: 19,
    lineHeight: 23,
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  headerMeta: {
    fontFamily: Typography.bodySans.fontFamily,
    marginTop: 2,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.45,
  },

  headerDivider: {
    height: StyleSheet.hairlineWidth,
  },

  /* THREAD */

  thread: {
    flex: 1,
  },

  threadContent: {
    paddingTop: Spacing.five,
    paddingBottom: Spacing.five,
  },

  threadIntro: {
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    marginBottom: Spacing.five,
  },

  threadLabel: {
    opacity: 0.45,
  },

  threadTitle: {
    marginTop: Spacing.two,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 27,
    lineHeight: 32,
    letterSpacing: -0.4,
  },

  threadSubtitle: {
    marginTop: Spacing.two,
    maxWidth: 300,
    textAlign: 'center',
    fontFamily: Typography.body.fontFamily,
    fontSize: 15,
    lineHeight: 23,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },

  dateLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },

  dateText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  /* MESSAGES */

  receivedRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    marginBottom: Spacing.four,
    paddingRight: Spacing.five,
  },

  receivedContent: {
    flex: 1,
    alignItems: 'flex-start',
  },

  sentRow: {
    alignItems: 'flex-end',
    marginBottom: Spacing.four,
    paddingLeft: Spacing.five,
  },

  sentContent: {
    alignItems: 'flex-end',
  },

  receivedBubble: {
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },

  sentBubble: {
    borderRadius: 18,
    borderBottomRightRadius: 5,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },

  messageText: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 16,
    lineHeight: 23,
  },

  /* PROMPT */

  promptCard: {
    marginTop: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.lg,
    padding: Spacing.four,
  },

  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  promptDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  promptLabel: {
    opacity: 0.55,
  },

  promptTitle: {
    marginTop: Spacing.three,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 21,
    lineHeight: 27,
  },

  promptBody: {
    marginTop: Spacing.two,
    fontFamily: Typography.body.fontFamily,
    fontSize: 15,
    lineHeight: 23,
  },

  promptButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* COMPOSER */

  composerWrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },

  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
  },

  inputWrap: {
    flex: 1,
  },

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },

  sendArrow: {
    fontSize: 21,
    lineHeight: 23,
    fontWeight: '500',
  },
});