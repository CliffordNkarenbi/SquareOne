import { Tabs } from "expo-router";

import { TabBar } from "../../../components/TabBar";

const TabsLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="bible" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
      
    </Tabs>
  )
}

export default TabsLayout;