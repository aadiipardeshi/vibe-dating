import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Text } from '@/components/ui/text';
import {
  Radius,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AvatarProps = {
  uri?: string | null;
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

export function Avatar({
  uri,
  name,
  size = 56,
  style,
}: AvatarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: size / 2,
            },
          ]}
          contentFit="cover"
          transition={180}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize: Math.max(12, size * 0.3),
              lineHeight: Math.max(15, size * 0.35),
              color: theme.textSecondary,
            },
          ]}
        >
          {initials(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.full,
  },

  initials: {
    fontFamily: Typography.heading.fontFamily,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
});