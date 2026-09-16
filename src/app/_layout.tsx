import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { queryClient } from "../lib/queryClient";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing publishable key. Please add it to your environment variables.",
    );
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider
                publishableKey={publishableKey}
                tokenCache={tokenCache}
            >
                <Stack screenOptions={{ headerShown: false }} />
            </ClerkProvider>
        </QueryClientProvider>
    );
}
