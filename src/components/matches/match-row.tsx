import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import {
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MatchRowProps = {
  name: string;
  preview: string;
};

export function MatchRow({
  name,
  preview,
}: MatchRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.avatarWrap}>
        <Avatar name={name} />

        <View
          style={[
            styles.onlineDot,
            {
              backgroundColor: theme.accentMuted,
              borderColor: theme.surface,
            },
          ]}
        />
      </View>

      <View style={styles.copy}>
        <View style={styles.topRow}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text
            style={[
              styles.time,
              {
                color: theme.textTertiary,
              },
            ]}
          >
            8:42 PM
          </Text>
        </View>

        <View style={styles.previewRow}>
          <Text
            style={[
              styles.preview,
              {
                color: theme.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {preview}
          </Text>

          <View
            style={[
              styles.unreadDot,
              {
                backgroundColor: theme.accentMuted,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.three,
  },

  avatarWrap: {
    position: 'relative',
  },

  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },

  copy: {
    flex: 1,
    justifyContent: 'center',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },

  name: {
    flex: 1,
    fontFamily: Typography.heading.fontFamily,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '400',
  },

  time: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  previewRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  preview: {
    flex: 1,
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 13,
    lineHeight: 18,
  },

  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});