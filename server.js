import express from "express";
import { configDotenv } from "dotenv";
import  connectDB  from "./services/DBConnection.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
// import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Resolving dirname for ES6 modules
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log(path.join(_dirname, 'client', 'dist'));

configDotenv();
connectDB();

const app = express();
//  app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);

// use the client name
app.use(express.static(path.join(_dirname, 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
}
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});