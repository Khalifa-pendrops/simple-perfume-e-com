"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/products", product_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/reviews", reviews_routes_1.default);
app.listen(port, () => {
    (0, db_1.connectDatase)();
    console.log(`This Server is running on port ${port}`);
});
