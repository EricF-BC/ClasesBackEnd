import express from "express";
import morgan from "morgan";
import fs from "fs";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/carts", cartRouter);
app.use("/products", productRouter);

let products = [];

const loadProducts = async () => {
  try {
    const data = await fs.promises.readFile(
      `${__dirname}/db/products.json`,
      "utf-8"
    );
    products = JSON.parse(data);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};

app.get("/", async (req, res) => {
  try {
    await loadProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    res.status(500).send("Error al cargar la página");
  }
});

app.get("/realtimeproducts", async (req, res) => {
  try {
    await loadProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    res.status(500).send("Error al cargar la página");
  }
});

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server ok en puerto ${PORT}`)
);
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.emit("products", products);

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  // socket.emit('saludosDesdeBack', 'Bienvenidos a websocket')

  // socket.on('respuestaDesdeFront', (message) =>{
  //     console.log(message);
  // })

  socket.on("newProduct", (prod) => {
    products.push(prod);
    socketServer.emit("products", products);
  });
});
