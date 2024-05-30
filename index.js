const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 8000;
dotenv.config();
// const BlackListedToken = require('./model/blacklist/BlackListModel')

const adminRouter = require("./routes/adminRoutes");
const sellerRouter = require("./routes/sellerRoutes");
const customerRouter = require('./routes/customerRoutes')

const { sequelize, connectDB } = require("./db/db");
connectDB();

app.use(express.json());


app.use("/api/admin", adminRouter);
app.use('/api/seller',sellerRouter)
app.use('/api/customer',customerRouter)

// app.use('/api/admin/movie',movieRouter)

app.listen(PORT, () => {
  console.log("Server is running at 8000");
});
