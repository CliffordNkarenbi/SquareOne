import HomeHeader from '@/components/HomeHeader';
import PostListItem from '@/components/PostListItem';
import { dummyPosts } from '@/dummyData';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    return dummyPosts.filter(post => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
      const matchesSearch = searchQuery === '' || 
        post.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  const clearCategories = () => setSelectedCategories([]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FlatList
        ref={flatListRef}
        data={filteredPosts}
        renderItem={({ item }) => (
          <PostListItem post={item} />
        )}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <HomeHeader 
            posts={dummyPosts} 
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        }
        stickyHeaderIndices={[0]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Pressable
          onPress={scrollToTop}
          style={{
            position: 'absolute',
            bottom: 90,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Feather name="arrow-up" size={24} color={colors.text} />
        </Pressable>
      )}
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );

}

