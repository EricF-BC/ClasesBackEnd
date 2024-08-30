import express from "express";
import dotenv from 'dotenv'
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import MongoStore from 'connect-mongo';
import { initMongoDB } from "./persistence/daos/mongodb/database.js";
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
import "./passport/local-strategy.js";
import "./passport/github-strategy.js"
import "./passport/google-strategy.js";
import config from "./config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { info } from './docs/info.js';


const app = express();

const storeConfig = {
  store:  MongoStore.create({
    mongoUrl: config.MONGO_URL,
    // crypto: {secret: process.env.SECRET_KEY },
    ttl: 180
  }),
  secret: config.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 180000,
    secure: false  
  }
}

const PORT = config.PORT;

const specs = swaggerJSDoc(info);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

initMongoDB();
app.use("/", indexRouter);
app.use(errorHandler)

app.get('/', (req, res) => {
  res.redirect('/views/login');
})

app.get("/chat", async (req, res) => {
  if (req.session.role === 'user'){
    res.render("chat");
  }
  
});

const httpServer = app.listen(PORT, () =>
  logger.info(`Server ok en puerto ${PORT}`)
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
