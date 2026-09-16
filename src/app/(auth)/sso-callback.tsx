import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function SSOCallbackScreen() {
    const { isLoaded, isSignedIn } = useAuth();

    if (isLoaded && isSignedIn) {
        return <Redirect href="/" />;
    }

    return (
        <View className="flex-1 items-center justify-center gap-4 bg-[#F7F7F4]">
            <ActivityIndicator color="#D2673A" size="large" />
            <Text className="text-base text-[#60636C]">
                Completing sign-in...
            </Text>
        </View>
    );
}
