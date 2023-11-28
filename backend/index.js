const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const TextFlow = require("textflow.js");
const textflow = TextFlow.useKey("qz9iudfUGY1OMS1WHG7ZwyqP7K1nBO1qlnvVkBe1sIjDlnQXG2H0LWXbORdCCLSJ");

app.get("/send", async (req, res) => {
	const { phone_number } = req.query;
	return res.send(await textflow.sendVerificationSMS(phone_number, { service_name: "Ringo" }));
});

app.get("/verify", async (req, res) => {
	const { phone_number, code } = req.query;
	return res.send(await textflow.verifyCode(phone_number, code));
});

app.listen("3000", () => console.log("Connected to http://localhost:3000"));