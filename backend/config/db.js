const mongoose = require("mongoose");
const dns = require('node:dns');

/**
 * FIX for ECONNREFUSED: 
 * Node.js 18+ defaults to IPv6, which often causes connection 
 * issues with MongoDB Atlas SRV records on many networks.
 */
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    
    // We add connection options to handle the network sensitivity
    const connectionOptions = {
      family: 4, // Force the connection to use IPv4 instead of IPv6
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed!");
    
    console.error(`Error Message: ${error.message}`);
    
    // Troubleshooting tips for the user
    if (error.message.includes('ECONNREFUSED')) {
      console.log("\n--- TROUBLESHOOTING TIP ---");
      console.log("1. Check if your IP is whitelisted in MongoDB Atlas (Network Access).");
      console.log("2. If on a restricted Wi-Fi, try using a Mobile Hotspot.");
      console.log("3. Verify that your MONGO_URI password is URL encoded if it has @ or #.");
    }

    process.exit(1);
  }
};

module.exports = connectDB;