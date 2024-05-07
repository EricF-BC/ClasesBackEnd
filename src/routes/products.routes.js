import { Router } from "express";
const router = Router();

import { __dirname } from "../path.js";

import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

import { productValidator } from "../middlewares/productValidator.js";
