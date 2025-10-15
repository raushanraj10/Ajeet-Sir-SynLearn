
const express=require("express")
const cookieparser =require("cookie-parser")
const connectDb=require("./src/config/Database")
const cors =require("cors")
const app=express();
require('dotenv').config()
app.use(cookieparser())

const allowedOrigins = [
  process.env.BASE_URL1,
  process.env.BASE_URL2,
  process.env.BASE_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json())


const AuthRouter =require("./src/Routes/AuthRouter");
const UploadRouter = require("./src/Routes/UploadRouter");




app.use("/",AuthRouter)
app.use("/",UploadRouter)
app.use("/",(req,res)=>{res.send("done")})


connectDb()
  .then(() => {
    const port = process.env.PORT || 5000; // Use uppercase PORT
    app.listen(port, '0.0.0.0', () => {   // '0.0.0.0' makes it reachable from Nginx
      console.log("Database connected successfully");
      console.log(`App is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error: Could not connect to your database", err);
  });


