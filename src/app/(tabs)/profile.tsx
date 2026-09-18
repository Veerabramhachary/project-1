import { useAuth, useUser } from "@clerk/expo";
import * as Haptics from "expo-haptics";
import { Redirect, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ProfileScreen = () => {
    const { isSignedIn, signOut } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />;
    }

    const handleLogout = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.replace("/(tabs)");
        await signOut();
    };
    return (
        <SafeAreaView className="flex-1 ">
            <View className="flex-1 justify-center px-5">
                <View className="items-center rounded-3xl bg-white p-6">
                    {user?.imageUrl ? (
                        <Image
                            source={{ uri: user.imageUrl }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                            }}
                        />
                    ) : (
                        <View className="h-24 w-24 items-center justify-center rounded-full bg-gray-300">
                            <Text className="text-2xl font-bold text-white">
                                {user?.firstName?.[0]}
                            </Text>
                        </View>
                    )}
                    <Text className="text-2xl font-bold mt-5 text-[#1f2933]">
                        {user?.fullName ?? "User"}
                    </Text>
                    <Text className="mt-1 text-base font-medium text-[#6b7280]">
                        {user?.primaryEmailAddress?.emailAddress ?? "No email"}
                    </Text>
                    <Pressable
                        onPress={handleLogout}
                        className="mt-8 w-full items-center rounded-2xl bg-[#f97316] py-4 active:opacity-90"
                    >
                        <Text className="text-base font-bold text-white">
                            LogOut
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default ProfileScreen;
