import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './button';
import { Text } from './text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function EditorialModal({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const theme = useTheme();
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <SafeAreaView style={[styles.backdrop, { backgroundColor: theme.overlay }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboard}>
        <View accessibilityViewIsModal style={[styles.sheet, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            <Text type="bodySans" style={{ fontSize: 24, lineHeight: 30, fontWeight: '600' }} accessibilityRole="header">{title}</Text>
            {children}
            <Button variant="ghost" onPress={onClose}>Close</Button>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Modal>;
}
const styles = StyleSheet.create({
  backdrop: { flex: 1, padding: Spacing.four, justifyContent: 'center', alignItems: 'center' },
  keyboard: { width: '100%', maxWidth: MaxContentWidth, maxHeight: '90%' },
  sheet: { borderRadius: Radius.lg, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  content: { padding: Spacing.five, gap: Spacing.four },
});
