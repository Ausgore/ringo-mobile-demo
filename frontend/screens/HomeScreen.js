import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ route, navigation }) => {
	useEffect(() => {
		// If the previous page was login, then they shouldn't be able to go back
		navigation.addListener("beforeRemove", e => route.params?.isLogin && e.preventDefault());
	}, []);


	return (
		<View style={styles.container}>
			<Image source={require("../assets/carnival.png")} style={{ width: "100%", height: "auto", aspectRatio: 1.5 }} contentFit="contain" />
			<View style={{paddingHorizontal: 5 }}>
				<Text style={{ fontSize: 18, fontWeight: "800"}}>PLAZA SINGAPURA</Text>
				<Text style={{ fontSize: 14, fontStyle: "italic", color: "grey", marginBottom: 10 }}>20 Jan - 02 Feb</Text>
				<Text>Uncle Ringo is going to... Plaza Singapura!{"\n"}We'll be bringing our usual favourite attractions!{"\n"}Come on down and have some fun!</Text>
			</View>
			<StatusBar style="dark" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
	},
})

export default HomeScreen;