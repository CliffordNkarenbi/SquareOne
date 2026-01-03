import { dummyUser } from '@/dummyData';
import { useAppTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Post } from '../types';

interface HomeHeaderProps {
  posts: Post[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HomeHeader({ posts, selectedCategories, onCategoryToggle, searchQuery, onSearchChange }: HomeHeaderProps) {
  const { colors } = useAppTheme();

  // Dynamically extract unique categories from posts (no "All")
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(post => post.category));
    return Array.from(uniqueCategories).sort();
  }, [posts]);

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* Top Bar with Title and Profile */}
      <View className="flex-row items-center justify-between px-6 pt-2.5 pb-10">
        <Text 
          style={{ color: colors.text }} 
          className="text-lg font-bold italic"
        >
          SQUARE ONE
        </Text>
        <Image 
          source={{ uri: dummyUser.image }}
          className="w-9 h-9 rounded-full"
        />
      </View>

      {/* Search Bar and Add Button */}
      <View className="flex-row items-center px-3 mb-4 gap-3">
        <View 
          style={{ backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 0.1, width: '100%', height: 48 }}
          className="flex-1 flex-row items-center px-4 py-3 rounded-[60]"
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={onSearchChange}
            style={{ color: colors.text, flex: 1 }}
            className="text-base"
          />
        </View>
        
        <Link href={"/new" as any} asChild>
          <Pressable 
            style={{ backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 0.1, width: 70, height: 48 }}
            className="w-12 h-12 rounded-[60] items-center justify-center"
          >
            <Feather name="plus" size={24} color={colors.text} />
          </Pressable>
        </Link>
      </View>

      {/* Category Tabs */}
      <View className="flex-row items-center px-3 pb-0">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ gap: 6 }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Pressable
                key={category}
                onPress={() => onCategoryToggle(category)}
                style={{
                  backgroundColor: isSelected ? colors.text : 'transparent', borderColor: colors.primary, borderWidth: 0.1
                }}
                className="px-4 py-2 rounded-[60]"
              >
                <Text 
                  style={{ 
                    color: isSelected ? colors.background : colors.text 
                  }}
                  className="text-xs font-medium"
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable 
          style={{ backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 0.1, width: 50, height: 40 }}
          className="w-10 h-10 rounded-[60] items-center justify-center ml-3"
        >
          <Feather name="sliders" size={14} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}
