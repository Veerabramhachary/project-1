import { useAuth } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import "../../global.css";
export default function Index() {
    const { isLoaded, isSignedIn } = useAuth();
    if (!isLoaded) {
        return null;
    }

    const hadleGoSignIn = () => {
        router.push("/sign-in");
    };
    return <Redirect href={isSignedIn ? "/(tabs)" : "/sign-in"} />;
}
