import { useLocalSearchParams, useRouter } from 'expo-router';
import {
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

  return (
    <Screen contentStyle={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
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
            name="Maya"
            size={38}
          />

          <View>
            <View style={styles.nameRow}>
              <Text style={styles.headerName}>
                Maya
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
              87% RESONANCE · ACTIVE NOW
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.55 : 1,
            },
          ]}
        >
          <Text style={styles.moreIcon}>
            ···
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
        style={styles.thread}
        contentContainerStyle={styles.threadContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.threadIntro}>
          <Text type="label" style={styles.threadLabel}>
            CONVERSATION {id?.toUpperCase() ?? 'PREVIEW'}
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
            You matched because your profiles shared a
            similar rhythm around travel, coffee and slow
            weekends.
          </Text>
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

        {/* RECEIVED */}
        <View style={styles.receivedRow}>
          <Avatar
            name="Maya"
            size={30}
          />

          <View style={styles.receivedContent}>
            <View
              style={[
                styles.receivedBubble,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={styles.messageText}>
                You mentioned forgotten bookshops. I need to
                know your current favourite.
              </Text>
            </View>

            <Text
              style={[
                styles.timestamp,
                {
                  color: theme.textTertiary,
                },
              ]}
            >
              8:36 PM
            </Text>
          </View>
        </View>

        {/* SENT */}
        <View style={styles.sentRow}>
          <View style={styles.sentContent}>
            <View
              style={[
                styles.sentBubble,
                {
                  backgroundColor: theme.accent,
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  {
                    color: theme.onAccent,
                  },
                ]}
              >
                There&apos;s a tiny one near the old market.
                Mostly second-hand books, terrible signage,
                excellent coffee next door.
              </Text>
            </View>

            <Text
              style={[
                styles.sentTimestamp,
                {
                  color: theme.textTertiary,
                },
              ]}
            >
              8:39 PM · READ
            </Text>
          </View>
        </View>

        {/* RECEIVED */}
        <View style={styles.receivedRow}>
          <Avatar
            name="Maya"
            size={30}
          />

          <View style={styles.receivedContent}>
            <View
              style={[
                styles.receivedBubble,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={styles.messageText}>
                That sounds suspiciously like my ideal
                Saturday.
              </Text>
            </View>

            <Text
              style={[
                styles.timestamp,
                {
                  color: theme.textTertiary,
                },
              ]}
            >
              8:42 PM
            </Text>
          </View>
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
            A coffee and bookshop wander feels unusually
            on-theme.
          </Text>

          <Pressable
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
              SUGGEST A DATE
            </Text>
          </Pressable>
        </View>
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
              placeholder="Write something unhurried"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: theme.accent,
                opacity: pressed ? 0.78 : 1,
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
    width: 36,
    height: 36,
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
    marginTop: 2,
    fontSize: 7,
    lineHeight: 10,
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
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  /* MESSAGES */

  receivedRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    marginBottom: Spacing.four,
    paddingRight: 60,
  },

  receivedContent: {
    flex: 1,
    alignItems: 'flex-start',
  },

  sentRow: {
    alignItems: 'flex-end',
    marginBottom: Spacing.four,
    paddingLeft: 62,
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
    fontFamily: Typography.body.fontFamily,
    fontSize: 16,
    lineHeight: 23,
  },

  timestamp: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '600',
    letterSpacing: 0.7,
  },

  sentTimestamp: {
    marginTop: 5,
    marginRight: 5,
    fontSize: 7,
    lineHeight: 10,
    fontWeight: '600',
    letterSpacing: 0.7,
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
    minHeight: 40,
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