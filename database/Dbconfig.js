// const mongoose = require("mongoose");

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     // You might want to handle the error more gracefully, such as throwing it or exiting the process
//     process.exit(1);
//   }
// };

// module.exports = { connectToDatabase };

const mongoose=require('mongoose');
require('dotenv').config();
mongoose
.connect(process.env.MONGO_URI )
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

module.exports = mongoose;
