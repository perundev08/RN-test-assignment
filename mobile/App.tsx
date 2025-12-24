import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PostCard } from './src/components/PostCard';
import { LoadingSpinner } from './src/components/LoadingSpinner';
import { EmptyState } from './src/components/EmptyState';
import { FlagReasonModal } from './src/components/FlagReasonModal';
import { usePosts } from './src/hooks/usePosts';
import { FlagReason } from './src/types';

export default function App() {
  const { posts, loading, flaggingPostId, refreshPosts, flagPost } = usePosts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleFlagPress = useCallback((postId: string) => {
    setSelectedPostId(postId);
    setModalVisible(true);
  }, []);

  const handleSelectReason = useCallback(
    async (reason: FlagReason) => {
      if (selectedPostId) {
        await flagPost(selectedPostId, reason);
      }
      setSelectedPostId(null);
    },
    [selectedPostId, flagPost]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshPosts();
    setRefreshing(false);
  }, [refreshPosts]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading posts..." />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onFlagPress={handleFlagPress}
            isFlagging={flaggingPostId === item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
            colors={['#007AFF']}
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={5}
      />

      <FlagReasonModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPostId(null);
        }}
        onSelectReason={handleSelectReason}
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContent: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
});
