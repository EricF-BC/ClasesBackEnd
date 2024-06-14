import express from "express";
import morgan from "morgan";
import fs from "fs";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import MongoStore from 'connect-mongo';
import { initMongoDB } from "./daos/mongodb/database.js";
import { MessageModel } from "./daos/mongodb/models/chat.model.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import loginRouter from "./routes/login.routes.js";
import viewsRouter from "./routes/views.routes.js";
import session from 'express-session';
import userRouter from "./routes/user.routes.js";

const app = express();

const storeConfig = {
  store:  MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    // crypto: {secret: process.env.SECRET_KEY },
    ttl: 180
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 180000
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


initMongoDB();

app.use("/carts", cartRouter);
app.use("/products", productRouter);
app.use('/login', loginRouter);
app.use('/views', viewsRouter);
app.use('/users', userRouter)

app.get("/chat", async (req, res) => {
  res.render("chat");
});

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server ok en puerto ${PORT}`)
);
const socketServer = new Server(httpServer);


// let products = [];

// const loadProducts = async () => {
//   try {
//     const data = await fs.promises.readFile(
//       `${__dirname}/db/products.json`,
//       "utf-8"
//     );
//     products = JSON.parse(data);
//   } catch (error) {
//     console.error("Error al cargar los productos:", error);
//   }
// };

// app.get("/", async (req, res) => {
//   try {
//     await loadProducts();
//     res.render("home", { products });
//   } catch (error) {
//     console.error("Error al cargar los productos:", error);
//     res.status(500).send("Error al cargar la página");
//   }
// });

// app.get("/realtimeproducts", async (req, res) => {
//   try {
//     await loadProducts();
//     res.render("realTimeProducts", { products });
//   } catch (error) {
//     console.error("Error al cargar los productos:", error);
//     res.status(500).send("Error al cargar la página");
//   }
// });


// socketServer.on("connection", (socket) => {
//   console.log("Usuario conectado");

//   socket.on("newMessage", async (data) => {
//     const { user, message } = data;
//     try {
//       const chatMessage = new MessageModel({ user, message });
//       await chatMessage.save();
//       socket.emit("message", data);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado");
//   });
// });

// socketServer.on("connection", (socket) => {
//   console.log(`Usuario conectado: ${socket.id}`);

//   socket.emit("products", products);

//   socket.on("disconnect", () => {
//     console.log("Disconnected");
//   });

//   // socket.emit('saludosDesdeBack', 'Bienvenidos a websocket')

//   // socket.on('respuestaDesdeFront', (message) =>{
//   //     console.log(message);
//   // })

//   socket.on("newProduct", (prod) => {
//     products.push(prod);
//     socketServer.emit("products", products);
//   });
// });
