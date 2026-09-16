import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import "../../global.css";
export default function Index() {
    const { isLoaded, isSignedIn } = useAuth();
    if (!isLoaded) {
        return null;
    }

    const hadleGoSignIn = () => {
        router.push("/sign-in");
    };
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Edit src/app/index.tsx to edit this screen.</Text>
            {!isSignedIn ? (
                <Pressable onPress={hadleGoSignIn} style={{ marginTop: 20 }}>
                    <Text style={{ color: "blue" }}>Go to Sign In</Text>
                </Pressable>
            ) : (
                ""
            )}
        </View>
    );
}
