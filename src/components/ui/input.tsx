import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { Text } from '@/components/ui/text';
import {
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  style,
  multiline,
  ...rest
}: InputProps) {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text
          type="label"
          style={styles.label}
        >
          {label.toUpperCase()}
        </Text>
      ) : null}

      <TextInput
        placeholderTextColor={theme.textTertiary}
        multiline={multiline}
        selectionColor={theme.accentMuted}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            color: theme.text,
            backgroundColor: theme.surface,
            borderColor: error
              ? theme.accentMuted
              : theme.border,
          },
          style,
        ]}
        {...rest}
      />

      {error ? (
        <Text
          style={[
            styles.error,
            {
              color: theme.accentMuted,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    gap: Spacing.two,
  },

  label: {
    opacity: 0.58,
  },

  input: {
    width: '100%',
    minHeight: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.four,

    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },

  multiline: {
    minHeight: 120,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    textAlignVertical: 'top',
  },

  error: {
    fontFamily: Typography.bodySans.fontFamily,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
  },
});