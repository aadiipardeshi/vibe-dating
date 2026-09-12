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
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <WebTabList>
          <TabTrigger name="discover" href="/" asChild>
            <TabButton>Discover</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
          <TabTrigger name="matches" href="/matches" asChild>
            <TabButton>Matches</TabButton>
          </TabTrigger>
        </WebTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const theme = useTheme();

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View
        style={[
          styles.tab,
          { backgroundColor: isFocused ? theme.backgroundSelected : 'transparent' },
        ]}>
        <Text type="caption" tone={isFocused ? 'text' : 'textSecondary'}>
          {children}
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
        <Text type="label" style={styles.brand}>
          Vibe
        </Text>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
  bar: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    alignItems: 'center',
  },
  inner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: 999,
    borderWidth: 1,
  },
  brand: {
    marginRight: 'auto',
    marginLeft: Spacing.two,
  },
  tab: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
  },
  pressed: {
    opacity: 0.7,
  },
});
