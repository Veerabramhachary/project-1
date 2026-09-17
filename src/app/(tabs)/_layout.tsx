import { NativeTabs } from "expo-router/unstable-native-tabs";
export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="feed">
                <NativeTabs.Trigger.Label>Feed</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf="0.circle"
                    md="3g_mobiledata_badge"
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="person" md="person" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
                <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="gear" md="settings" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="notifications">
                <NativeTabs.Trigger.Label>
                    Notifications
                </NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="bell" md="notifications" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
