import { useAppTheme } from '@/theme';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Post } from '../types';

dayjs.extend(relativeTime);

export default function PostListItem({ post }: { post: Post }) {
  const { colors } = useAppTheme();

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]}
      className="mx-3 my-1.5 rounded-[24px] p-5"
    >
      {/* Avatar and Post Info */}
      <View className="flex-row items-center mb-2">
        <Image 
          source={{ uri: post.user.image }} 
          className="w-10 h-10 rounded-full mr-2"
        />
        <View>
          <Text style={[styles.title, { color: colors.text }]} className="font-semibold text-sm">
            {post.heading}
          </Text>
          <Text style={[styles.date, { color: colors.textSecondary }]} className="text-xs">
            {dayjs(post.createdAt).fromNow()}
          </Text>
        </View>
      </View>

      {/* Post Description with Optional Thumbnail */}
      <View className="flex-row items-center">
        {/* Post Description */}
        <Text style={[styles.description, { color: colors.textSecondary }]} className="flex-1 text-sm leading-relaxed mr-3" numberOfLines={3}>
          {post.content}
        </Text>

        {/* Right side: Optional Thumbnail */}
        {post.user.id === '3' && (
          <Image 
            source={{ uri: post.user.image }} 
            className="w-20 h-20 rounded-2xl "
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  name: {},
  username: {},
  title: {},
  date: {},
  description: {},
});