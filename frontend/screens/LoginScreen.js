import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
	const inputRef = useRef();
	const [modalVisible, setModalVisible] = useState(false);

	const [sendingMessage, setSendingMessage] = useState(false);
	const [status, setStatus] = useState();
	const [number, setNumber] = useState();
	const [codeValue, setCodeValue] = useState("");
	const [codeValid, setCodeValid] = useState();


	useEffect(() => {
		Keyboard.addListener("keyboardDidHide", () => inputRef.current?.blur());
	}, [inputRef]);

	const sendCode = async () => {
		// REMEMBER TO REMOVE WHEN FINISHED
		return navigation.navigate("Home", { isLogin: true });
		setStatus(null);
		setSendingMessage(true);
		const { data } = await axios.get(`https://b008-115-66-60-181.ngrok-free.app/send?phone_number=%2B65${number}`);
		setSendingMessage(false);
		setCodeValid(null);
		setCodeValue("")
		setStatus(data.status);
		console.log(data);
	}

	/**
	 * @param {string} text 
	 */
	const handleOnChangeText = async (text) => {
		setCodeValue(text);
		if (text.length == 6 && status == 200) {
			const { data } = await axios.get(`https://b008-115-66-60-181.ngrok-free.app/verify?phone_number=%2B65${number}&code=${text}`);
			setCodeValid(data.valid);
			console.log(data);
			navigation.navigate("Home");
		}
	}

	return (
		<View style={styles.container}>
			<Image source={require("../assets/logo.png")} style={styles.logoImage} contentFit="contain" />
			<Text style={styles.label}>EMAIL</Text>
			<TextInput style={[styles.input, { marginBottom: 15 }]} placeholder="Enter your email..." ref={inputRef} maxLength={320} />

			<Text style={styles.label}>PASSWORD</Text>
			<TextInput style={[styles.input, { marginBottom: 5 }]} placeholder="Enter your password..." ref={inputRef} maxLength={80} />
			<Text style={styles.link}>Forgot your password?</Text>

			<Pressable style={styles.button} onPress={() => setModalVisible(true)}>
				<Text style={styles.buttonText}>Login</Text>
			</Pressable>

			<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)} statusBarTranslucent={true}>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View style={styles.overlay} />
				</TouchableWithoutFeedback>
				<View style={styles.modalBody}>
					<Image source={require("../assets/mobile.png")} style={styles.mobileImage} contentFit="contain" />
					<Text style={{ marginTop: 50, fontWeight: "800", fontSize: 20, alignSelf: "center" }}>Enter a Phone Number</Text>
					<Text style={{ alignSelf: "center", textAlign: "center" }}>You will receive a text message with a verification code.</Text>
					<View style={styles.mobileVerificationRow}>
						<Text style={{ marginRight: 15 }}>+65</Text>
						<TextInput placeholder="Enter your phone number" onChangeText={setNumber} keyboardType="numeric" maxLength={8} />
						<Pressable style={{ marginLeft: "auto" }} onPress={sendCode}>
							<Text style={{ fontWeight: "800" }}>Send</Text>
						</Pressable>
					</View>
					{sendingMessage && <Text style={[styles.errorMessage, { color: "grey"}]}>Sending SMS with OTP to +65{number}...</Text>}
					{status == 400 && <Text style={styles.errorMessage}>Please enter a valid phone number.</Text>}
					{status == 200 && <>
						<Text style={{ marginTop: 20, fontWeight: "800", fontSize: 20, alignSelf: "center" }}>Enter OTP</Text>
						<Text style={{ alignSelf: "center", textAlign: "center" }}>Enter the OTP sent to your phone number within 10 minutes.</Text>
						<TextInput style={{ alignSelf: "center", textAlign: "center", fontSize: 16, borderBottomWidth: 1, borderColor: "black", width: 60, marginTop: 5 }} maxLength={6} keyboardType="numeric" onChangeText={handleOnChangeText} value={codeValue} />
						{codeValid == false && <Text style={[styles.errorMessage, { textAlign: "center" }]} >The OTP provided is invalid.</Text>}
						{codeValid == true && <Text style={[styles.errorMessage, { textAlign: "center", color: "green"}]}>Welcome to Ringo!</Text>}
					</>}
				</View>
			</Modal>

			<StatusBar style="dark" />
		</View>
	);
}

const styles = StyleSheet.create({
	errorMessage: {
		marginTop: 5,
		color: "red",
		fontSize: 12,
		fontStyle: "italic"
	},
	overlay: {
		backgroundColor: "rgba(0,0,0,0.8)",
		position: "absolute",
		width: "100%",
		height: "100%"
	},
	modalBody: {
		position: "relative",
		marginTop: 100,
		marginHorizontal: 20,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 20,
		paddingBottom: 35
	},
	mobileVerificationRow: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		borderColor: "black",
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5
	},
	container: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	mobileImage: {
		width: 150,
		height: "auto",
		aspectRatio: 1.5,
		alignSelf: "center",
		position: "absolute",
		top: -50
	},
	logoImage: {
		width: 200,
		height: "auto",
		aspectRatio: 2,
		alignSelf: "center"
	},
	label: {
		fontWeight: "700",
		marginBottom: 5
	},
	input: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 5
	},
	link: {
		color: "blue",
		marginBottom: 20
	},
	button: {
		width: "100%",
		backgroundColor: "#f11515",
		alignItems: "center",
		borderRadius: 5,
		padding: 10
	},
	buttonText: {
		color: "white",
		fontWeight: "700"
	}
});


export default LoginScreen;