import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Text } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { type FeedPost } from '@/data/feed';
import { useTheme } from '@/hooks/use-theme';

type ExplorePostCardProps = {
  post: FeedPost;
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  onMore: () => void;
};

export function ExplorePostCard({ post, onLike, onComment, onSave, onMore }: ExplorePostCardProps) {
  const theme = useTheme();
  const comment = post.comments.at(-1);
  return (
    <View style={[styles.post, { borderBottomColor: theme.border }]}>
      <View style={styles.header}>
        <Avatar name={post.name} source={post.avatar} size={36} />
        <View style={styles.identity}>
          <Text type="bodySans" style={styles.name}>{post.name}</Text>
          <Text type="bodySans" tone="textSecondary" style={styles.meta}>{post.location}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${post.name}'s post`} onPress={onMore} style={styles.icon}>
          <Text type="bodySans" style={styles.more}>···</Text>
        </Pressable>
      </View>
      <Image source={post.media} contentFit="cover" style={styles.media} accessibilityLabel={`${post.name}: ${post.caption}`} />
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" accessibilityLabel={post.liked ? 'Unlike post' : 'Like post'} accessibilityState={{ selected: post.liked }} onPress={onLike} style={styles.icon}>
          <Text type="bodySans" style={[styles.heart, { color: post.liked ? theme.accentMuted : theme.text }]}>{post.liked ? '♥' : '♡'}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Open comments" onPress={onComment} style={styles.action}>
          <Text type="bodySans" style={styles.caption}>Comment</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={post.saved ? 'Unsave post' : 'Save post'} accessibilityState={{ selected: post.saved }} onPress={onSave} style={[styles.action, styles.save]}>
          <Text type="bodySans" tone={post.saved ? 'accent' : 'textSecondary'} style={styles.caption}>{post.saved ? 'Saved' : 'Save'}</Text>
        </Pressable>
      </View>
      <Text type="bodySans" style={styles.likes}>{post.likeCount} likes</Text>
      <Text type="bodySans" style={styles.caption}>
        <Text type="bodySans" style={styles.name}>{post.name} </Text>{post.caption}
      </Text>
      <Pressable accessibilityRole="button" onPress={onComment} style={styles.comments}>
        <Text type="bodySans" tone="textSecondary" style={styles.caption}>
          {post.commentCount ? `View ${post.commentCount === 1 ? '1 comment' : `all ${post.commentCount} comments`}` : 'Add a comment'}
        </Text>
        {comment && <Text type="bodySans" tone="textSecondary" numberOfLines={1} style={styles.caption}>{comment.name}: {comment.body}</Text>}
      </Pressable>
      <Text type="bodySans" tone="textSecondary" style={styles.meta}>{post.timestamp}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  post: { paddingBottom: Spacing.four, marginBottom: Spacing.four, borderBottomWidth: StyleSheet.hairlineWidth, gap: Spacing.one },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.two },
  identity: { flex: 1, minWidth: 0 },
  name: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  meta: { fontSize: 12, lineHeight: 17 },
  media: { width: '100%', aspectRatio: 1, borderRadius: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  icon: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  more: { fontSize: 22, lineHeight: 26 },
  heart: { fontSize: 25, lineHeight: 30 },
  action: { minHeight: 44, paddingHorizontal: Spacing.two, justifyContent: 'center' },
  save: { marginLeft: 'auto' },
  likes: { fontSize: 13, lineHeight: 19, fontWeight: '600' },
  caption: { fontSize: 14, lineHeight: 20 },
  comments: { minHeight: 44, justifyContent: 'center', gap: 2 },
});
