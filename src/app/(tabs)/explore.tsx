import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExplorePostCard } from '@/components/explore/explore-post-card';
import { Button, Input, Screen, Text } from '@/components/ui';
import { EditorialModal } from '@/components/ui/editorial-modal';
import { Spacing } from '@/constants/theme';
import { feedPosts, type FeedPost } from '@/data/feed';
import { usePrototypeStore } from '@/store/prototype';

export default function ExploreScreen() {
  const [posts, setPosts] = useState(feedPosts);
  const [surface, setSurface] = useState<{ id: string; type: 'comments' | 'options' } | null>(null);
  const [draft, setDraft] = useState('');
  const name = usePrototypeStore((state) => state.profile.name);
  const selected = posts.find((post) => post.id === surface?.id);

  function updatePost(id: string, update: (post: FeedPost) => FeedPost) {
    setPosts((previous) => previous.map((post) => post.id === id ? update(post) : post));
  }
  function addComment() {
    if (!selected || !draft.trim()) return;
    const comment = { id: `${Date.now()}-${Math.random()}`, name, body: draft.trim() };
    updatePost(selected.id, (post) => ({ ...post, comments: [...post.comments, comment], commentCount: post.commentCount + 1 }));
    setDraft('');
  }
  function close() { setSurface(null); setDraft(''); }

  return (
    <Screen scroll>
      <Text type="bodySans" accessibilityRole="header" style={styles.title}>Feed</Text>
      {posts.map((post) => (
        <ExplorePostCard
          key={post.id}
          post={post}
          onLike={() => updatePost(post.id, (current) => ({ ...current, liked: !current.liked, likeCount: current.likeCount + (current.liked ? -1 : 1) }))}
          onSave={() => updatePost(post.id, (current) => ({ ...current, saved: !current.saved }))}
          onComment={() => { setDraft(''); setSurface({ id: post.id, type: 'comments' }); }}
          onMore={() => setSurface({ id: post.id, type: 'options' })}
        />
      ))}
      <EditorialModal visible={Boolean(selected)} title={surface?.type === 'comments' ? 'Comments' : 'Post options'} onClose={close}>
        {selected && (surface?.type === 'comments' ? <>
          {selected.comments.length ? selected.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text type="bodySans" style={styles.name}>{comment.name}</Text>
              <Text type="bodySans" style={styles.body}>{comment.body}</Text>
            </View>
          )) : <Text type="bodySans" tone="textSecondary" style={styles.body}>Be the first to comment.</Text>}
          <Input accessibilityLabel="Your comment" placeholder="Add a comment…" value={draft} onChangeText={setDraft} maxLength={500} onSubmitEditing={addComment} returnKeyType="send" />
          <Button disabled={!draft.trim()} onPress={addComment}>Post comment</Button>
        </> : <>
          <Button variant="ghost" onPress={() => { close(); router.push({ pathname: '/match/[id]', params: { id: selected.personId } }); }}>{`View ${selected.name}'s profile`}</Button>
          <Button variant="ghost" onPress={() => { updatePost(selected.id, (post) => ({ ...post, saved: !post.saved })); close(); }}>{selected.saved ? 'Unsave post' : 'Save post'}</Button>
        </>)}
      </EditorialModal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 26, lineHeight: 32, fontWeight: '600', marginBottom: Spacing.four },
  comment: { gap: Spacing.one },
  name: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 20 },
});
