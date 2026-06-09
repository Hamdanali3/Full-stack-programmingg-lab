const mongoose = require("mongoose");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes("your_mongodb_connection_string")) {
    throw new Error(
      "MONGO_URI is not configured. Use MongoDB Atlas or local MongoDB, for example mongodb://127.0.0.1:27017/final_term_crm."
    );
  }

  const connection = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 7000
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

const isDBConnected = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isDBConnected };
