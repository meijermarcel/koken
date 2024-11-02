// import { Session } from "@supabase/supabase-js";
// import { Stack, useRouter } from "expo-router";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import { View, ActivityIndicator } from "react-native";

// export default function RootLayout() {
// 	const [session, setSession] = useState(null);
// 	const router = useRouter();

// 	useEffect(() => {
// 		const currentSession = supabase.auth.session();
// 		setSession(currentSession);

// 		const { data: authListener } = supabase.auth.onAuthStateChange(
// 			(event, session) => {
// 				setSession(session);
// 				if (!session) {
// 					router.push("/login"); // Redirect to login if no session
// 				}
// 			}
// 		);

// 		return () => {
// 			authListener?.unsubscribe();
// 		};
// 	}, []);

// 	if (session === null) {
// 		// Show loading indicator while checking session
// 		return (
// 			<View
// 				style={{
// 					flex: 1,
// 					justifyContent: "center",
// 					alignItems: "center",
// 				}}
// 			>
// 				<ActivityIndicator size="large" />
// 			</View>
// 		);
// 	}

// 	return (
// 		<Stack>
// 			{/* Stack navigator will automatically include index and other screens */}
// 		</Stack>
// 	);
// 	// const [session, setSession] = useState<Session | null>(null);

// 	// useEffect(() => {
// 	// 	supabase.auth.getSession().then(({ data: { session } }) => {
// 	// 		setSession(session);
// 	// 	});

// 	// 	supabase.auth.onAuthStateChange((_event, session) => {
// 	// 		setSession(session);
// 	// 	});
// 	// }, []);

// 	// return (
// 	// 	<Stack>
// 	// 		{session ? (
// 	// 			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// 	// 		) : (
// 	// 			<Stack.Screen name="index" options={{ headerShown: false }} />
// 	// 		)}
// 	// 		{/* <Stack.Screen name="+not-found" /> */}
// 	// 	</Stack>
// 	// );
// }

import { Slot } from "expo-router";
import { SessionProvider } from "../components/ctx";

export default function Root() {
	console.log("Root");
	// Set up the auth context and render our layout inside of it.
	return (
		<SessionProvider>
			<Slot />
		</SessionProvider>
	);
}
