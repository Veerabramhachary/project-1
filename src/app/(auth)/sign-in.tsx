import { useAuth, useSSO } from "@clerk/expo";
import { Link, Redirect, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function SignInScreen() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const { startSSOFlow } = useSSO();
    const [error, setError] = useState("");
    const [submittingProvider, setSubmittingProvider] = useState<
        "google" | "apple" | null
    >(null);
    const [pressedProvider, setPressedProvider] = useState<
        "google" | "apple" | null
    >(null);

    if (isLoaded && isSignedIn) {
        return <Redirect href="/" />;
    }

    async function handleSignIn(provider: "google" | "apple") {
        if (!isLoaded || submittingProvider) return;

        setError("");
        setSubmittingProvider(provider);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy:
                    provider === "google" ? "oauth_google" : "oauth_apple",
            });

            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
                router.replace("/");
            } else {
                setError(
                    "Additional verification is required to finish signing in.",
                );
            }
        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? caughtError.message
                    : "Unable to sign in.",
            );
        } finally {
            setSubmittingProvider(null);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-[#F7F7F4]"
        >
            <ScrollView
                contentContainerClassName="grow justify-center p-6"
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full max-w-[440px] self-center gap-[18px]">
                    <Text className="text-xs font-bold tracking-[1.5px] text-[#D2673A]">
                        WELCOME BACK
                    </Text>
                    <Text className="text-[42px] font-extrabold text-[#202125]">
                        Sign in
                    </Text>
                    <Text className="text-base leading-[23px] text-[#60636C]">
                        Continue listening to your favorite shows.
                    </Text>

                    {error ? (
                        <Text className="text-sm leading-5 text-[#B42318]">
                            {error}
                        </Text>
                    ) : null}

                    <View className="mt-[10px] gap-3">
                        {(["google", "apple"] as const).map((provider) => {
                            const label =
                                provider === "google"
                                    ? "Continue with Google"
                                    : "Continue with Apple";
                            const isSubmitting =
                                submittingProvider === provider;

                            return (
                                <Pressable
                                    accessibilityLabel={label}
                                    accessibilityRole="button"
                                    disabled={Boolean(submittingProvider)}
                                    key={provider}
                                    onPress={() => handleSignIn(provider)}
                                    onPressIn={() =>
                                        setPressedProvider(provider)
                                    }
                                    onPressOut={() => setPressedProvider(null)}
                                    className={`min-h-[54px] flex-row items-center justify-center rounded-xl p-4 ${
                                        provider === "google"
                                            ? "border border-[#E1E2DE] bg-white"
                                            : "bg-[#202125]"
                                    } ${
                                        pressedProvider === provider
                                            ? "opacity-80"
                                            : ""
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator
                                            color={
                                                provider === "google"
                                                    ? "#202125"
                                                    : "#FFFFFF"
                                            }
                                        />
                                    ) : (
                                        <Text
                                            className={`text-base font-bold ${
                                                provider === "google"
                                                    ? "text-[#202125]"
                                                    : "text-white"
                                            }`}
                                        >
                                            {label}
                                        </Text>
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>

                    <Text className="text-center text-sm text-[#60636C]">
                        New here?{" "}
                        <Link
                            href="/(auth)/sign-up"
                            className="font-bold text-[#D2673A]"
                        >
                            Create an account
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
