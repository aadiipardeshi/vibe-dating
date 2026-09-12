import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <NativeTabs
      backgroundColor={theme.surface}
      indicatorColor="transparent"
      iconColor={{
        default: theme.textTertiary,
        selected: theme.text,
      }}
      labelStyle={{
        default: {
          color: theme.textTertiary,
          fontSize: 9,
          fontWeight: '600',
        },
        selected: {
          color: theme.text,
          fontSize: 9,
          fontWeight: '700',
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          DISCOVER
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="safari"
          md="explore"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>
          FEED
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="rectangle.grid.1x2"
          md="view_agenda"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="matches">
        <NativeTabs.Trigger.Label>
          CHATS
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="bubble.left"
          md="chat_bubble_outline"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>PROFILE</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.crop.circle" md="account_circle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}