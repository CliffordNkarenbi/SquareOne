import { dummyUser } from '@/dummyData';
import { useAppTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  const [isComposing, setIsComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [composeCategory, setComposeCategory] = useState<string | null>(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [categoryAnchorWidth, setCategoryAnchorWidth] = useState(0);
  const [composerWidth, setComposerWidth] = useState(0);
  const [bodyContentHeight, setBodyContentHeight] = useState(56);

  // Animation drivers
  // composer: 0 = closed, 1 = open
  const composer = useSharedValue(0);
  // containerHeight animates to accommodate content growth
  const containerHeight = useSharedValue(48);

  useEffect(() => {
    // Height of the composer container
    const baseOpen = 160;
    const baseBody = 56;
    const extra = Math.max(0, bodyContentHeight - baseBody);
    const targetHeight = isComposing ? baseOpen + extra : 48;
    composer.value = withTiming(isComposing ? 1 : 0, { duration: 250 });
    containerHeight.value = withTiming(targetHeight, { duration: 250 });
  }, [isComposing, bodyContentHeight]);

  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
      flex: 1,
      borderRadius: interpolate(composer.value, [0, 1], [60, 15]),
    };
  });

  const addAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(composer.value, [0, 1], [70, 0]),
      opacity: interpolate(composer.value, [0, 1], [1, 0]),
    };
  });
  

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
        <Animated.View
          style={[
            { backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 0.1, overflow: 'visible' },
            searchAnimatedStyle,
          ]}
          className="flex-row items-center px-4 py-3"
        >
          {!isComposing ? (
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={onSearchChange}
              style={{ color: colors.textSecondary, flex: 1 }}
              className="text-base"
            />
          ) : (
            <View style={{ flex: 1 }} onLayout={(e) => setComposerWidth(e.nativeEvent.layout.width)}>
              {/* Composer Header */}
              <View className="flex-row items-center mb-0 mt-1">
                <Image source={{ uri: dummyUser.image }} className="w-7 h-7 rounded-full mr-2 " />
                <TextInput
                  placeholder="Post Title"
                  placeholderTextColor={colors.textSecondary}
                  value={title}
                  onChangeText={setTitle}
                  style={{ color: colors.text, flex: 1 }}
                  className="text-sm mb-0 pb-0"
                />
                <Pressable onPress={() => setIsComposing(false)} className="ml-2">
                  <Feather name="x" size={16} color={colors.text} />
                </Pressable>
              </View>

              {/* Category selector dropdown */}
              <View className="mb-0 ml-10 mt-0 relative">
                <Pressable
                  onPress={() => setShowCategoryMenu((v) => !v)}
                  className="flex-row items-center"
                  onLayout={(e) => setCategoryAnchorWidth(e.nativeEvent.layout.width)}
                >
                  <Text style={{ color: colors.textSecondary }} className="text-[10px] font-medium">
                    {composeCategory ?? 'Category'}
                  </Text>
                  <Feather name="chevron-down" size={14} color={colors.textSecondary} />
                </Pressable>
                {showCategoryMenu && (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: colors.primary,
                      borderWidth: 0.1,
                      position: 'absolute',
                      top: 0,
                      zIndex: 10,
                      width: 160,
                      ...(categoryAnchorWidth + 5 + 160 > composerWidth
                        ? { right: 5 }
                        : { left: categoryAnchorWidth + 5 }),
                    }}
                    className="rounded-[12]"
                  >
                    <ScrollView style={{ maxHeight: 120 }} showsVerticalScrollIndicator={false}>
                      {categories.map((c) => (
                        <Pressable
                          key={`menu-${c}`}
                          onPress={() => {
                            setComposeCategory(c);
                            setShowCategoryMenu(false);
                          }}
                          className="px-3 py-2"
                        >
                          <Text style={{ color: colors.text }} className="text-[10px]">
                            {c}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Body input */}
              <TextInput
                placeholder="What's on your mind?"
                placeholderTextColor={colors.textSecondary}
                value={body}
                onChangeText={setBody}
                multiline
                onContentSizeChange={(e) => setBodyContentHeight(e.nativeEvent.contentSize.height)}
                style={{ color: colors.text, flex: 1, minHeight: 60 }}
                className="text-sm"
              />

              {/* Actions row */}
              <View className="flex-row items-center mt-3 pb-2">
                <View className="flex-row items-center gap-4">
                  <Feather name="image" size={16} color={colors.text} />
                  <Feather name="mic" size={16} color={colors.text} />
                  <Feather name="file-text" size={16} color={colors.text} />
                </View>
                <View className="flex-row items-center ml-auto gap-4">
                  <Pressable onPress={() => { setIsComposing(false); setTitle(''); setBody(''); setComposeCategory(null); setShowCategoryMenu(false); }}>
                    <Text style={{ color: colors.textSecondary }} className="text-xs">Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={{ backgroundColor: colors.text }}
                    className="px-3 py-1 rounded-[60]"
                    onPress={() => {
                      // Placeholder post action
                      setIsComposing(false);
                    }}
                  >
                    <Text style={{ color: colors.background }} className="text-xs">Post</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
        <Animated.View style={[{ height: 48 }, addAnimatedStyle]}>
          <Pressable
            onPress={() => setIsComposing(true)}
            style={{ backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 0.1 }}
            className="h-12 rounded-[60] items-center justify-center"
          >
            <Feather name="plus" size={24} color={colors.text} />
          </Pressable>
        </Animated.View>
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
