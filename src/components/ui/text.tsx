import { Text as RNText, StyleSheet, type TextProps } from 'react-native';

import {
  Fonts,
  Typography,
  type ThemeColor,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AppTextProps = TextProps & {
  type?:
    | 'display'
    | 'title'
    | 'heading'
    | 'body'
    | 'bodySans'
    | 'caption'
    | 'label';

  tone?: ThemeColor;

  serif?: boolean;

  italic?: boolean;
};

export function Text({
  style,
  type = 'body',
  tone = 'text',
  serif,
  italic,
  ...rest
}: AppTextProps) {
  const theme = useTheme();

  return (
    <RNText
      style={[
        {
          color: theme[tone],
        },

        type === 'display' && styles.display,
        type === 'title' && styles.title,
        type === 'heading' && styles.heading,
        type === 'body' && styles.body,
        type === 'bodySans' && styles.bodySans,
        type === 'caption' && styles.caption,
        type === 'label' && styles.label,

        serif && {
          fontFamily: Fonts?.serif,
        },

        italic && {
          fontStyle: 'italic',
        },

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    ...Typography.display,
  },

  title: {
    ...Typography.title,
  },

  heading: {
    ...Typography.heading,
  },

  body: {
    ...Typography.body,
  },

  bodySans: {
    ...Typography.bodySans,
  },

  label: {
    ...Typography.label,
  },

  caption: {
    ...Typography.caption,
  },
});