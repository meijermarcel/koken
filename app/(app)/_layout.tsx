import { Text } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

import { useSession } from "../../components/ctx";

export default function AppLayout() {
	// const { session, isLoading } = useSession();
	// const [session, setSession] = useState(null);
	// const router = useRouter();

	// useEffect(() => {
	// 	const currentSession = supabase.auth.session();
	// 	setSession(currentSession);

	// 	const { data: authListener } = supabase.auth.onAuthStateChange(
	// 		(event, session) => {
	// 			setSession(session);
	// 			if (!session) {
	// 				router.push("/login"); // Redirect to login if no session
	// 			}
	// 		}
	// 	);

	// 	return () => {
	// 		authListener?.unsubscribe();
	// 	};
	// }, []);

	// console.log("session", session);

	// useEffect(() => {
	// 	supabase.auth.getSession().then(({ data: { session } }) => {
	// 		setSession(session);
	// 	});

	// 	supabase.auth.onAuthStateChange((_event, session) => {
	// 		setSession(session);
	// 	});
	// }, []);

	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	// You can keep the splash screen open, or render a loading screen like we do here.
	// if (isLoading) {
	// 	return <Text>Loading...</Text>;
	// }

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		console.log("redirecting to sign-in");
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/sign-in" />;
	}

	// This layout can be deferred because it's not the root layout.
	// return (
	// 	<Stack>
	// 		<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
	// 	</Stack>
	// );
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name="recipes"
				options={{
					title: "Recipes",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="schedule"
				options={{
					title: "Schedule",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "Sign Out",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "code-slash" : "code-slash-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
