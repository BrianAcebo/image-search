import express from "express";
import 'dotenv/config'
import { default as imagesRouter } from './api/images/index.js';

const app = express()
const PORT = parseInt(process.env.PORT) || 3000;
const { HOST } = process.env;

// Allow cross-origin request from https://cozyearth.com
// app.use(
// 	"/api",
// 	cors({
// 		origin: "https://cozyearth.com",
// 		methods: "GET, POST, PUT, DELETE",
// 	})
// );

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     res.header('Access-Control-Allow-Headers', 'Content-Type')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Udundi-Access-Token, Content-Type, Accept')
//     next()
//   })

// Public api endpoints
app.use("/api/image/", imagesRouter);

// Port listener
try {
	app.listen(PORT, () => {
		console.log(`Running on ${HOST}:${PORT}`);
	});
} catch (error) {
	console.error("Unable to connect\n", error);
}