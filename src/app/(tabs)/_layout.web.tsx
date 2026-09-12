import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  type TabListProps,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabsLayoutWeb() {
  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <WebTabList>
          <TabTrigger name="discover" href="/" asChild>
            <TabButton>Discover</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Feed</TabButton>
          </TabTrigger>
          <TabTrigger name="matches" href="/matches" asChild>
            <TabButton>Chats</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton>Profile</TabButton>
          </TabTrigger>
        </WebTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const theme = useTheme();

  return (
    <Pressable {...props} style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}>
      <View
        style={[
          styles.tab,
          { backgroundColor: isFocused ? theme.backgroundSelected : 'transparent' },
        ]}>
        <Text type="caption" tone={isFocused ? 'text' : 'textSecondary'}>
          {typeof children === 'string' ? children.toUpperCase() : children}
        </Text>
      </View>
    </Pressable>
  );
}

function WebTabList(props: TabListProps) {
  const theme = useTheme();

  return (
    <View {...props} style={styles.bar}>
      <View style={[styles.inner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    minHeight: 0,
  },
  slot: {
    flex: 1,
    minHeight: 0,
  },
  bar: {
    flexShrink: 0,
    width: '100%',
    padding: Spacing.three,
    alignItems: 'center',
  },
  inner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    padding: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
  },
  trigger: { flex: 1, minWidth: 0 },
  tab: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.one,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
