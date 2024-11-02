import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase.ts";
// const supabase = createClient(
// 	"https://dlqisoyvobfdhgvksdbm.supabase.co",
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRscWlzb3l2b2JmZGhndmtzZGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4Mjc3NTEsImV4cCI6MjA0NDQwMzc1MX0.dUAl8iKQyBMPCUyi6ocd88xY1b-ugbhgCQwjCViandk",
// 	{
// 		auth: {
// 			storage: AsyncStorage,
// 			autoRefreshToken: true,
// 			persistSession: true,
// 			detectSessionInUrl: false,
// 		},
// 	}
// );
// const supabase = createClient(
// 	"http://localhost:54321",
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
// 	{
// 		auth: {
// 			storage: AsyncStorage,
// 			autoRefreshToken: true,
// 			persistSession: true,
// 			detectSessionInUrl: false,
// 		},
// 	}
// );

export function Auth() {
	if (Platform.OS === "ios")
		return (
			<AppleAuthentication.AppleAuthenticationButton
				buttonType={
					AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
				}
				buttonStyle={
					AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
				}
				cornerRadius={5}
				style={{ width: 200, height: 64 }}
				onPress={async () => {
					try {
						const credential =
							await AppleAuthentication.signInAsync({
								requestedScopes: [
									AppleAuthentication.AppleAuthenticationScope
										.FULL_NAME,
									AppleAuthentication.AppleAuthenticationScope
										.EMAIL,
								],
							});
						console.log(credential);
						// Sign in via Supabase Auth.
						if (credential.identityToken) {
							const {
								error,
								data: { user },
							} = await supabase.auth.signInWithIdToken({
								provider: "apple",
								token: credential.identityToken,
							});
							console.log(
								JSON.stringify({ error, user }, null, 2)
							);
							if (!error) {
								// User is signed in.
							}
						} else {
							throw new Error("No identityToken.");
						}
					} catch (e: any) {
						if (e.code === "ERR_REQUEST_CANCELED") {
							// handle that the user canceled the sign-in flow
						} else {
							// handle other errors
						}
					}
				}}
			/>
		);
	return <>{/* Implement Android Auth options. */}</>;
}
