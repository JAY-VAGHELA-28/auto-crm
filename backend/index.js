require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/newcars", require("./routes/newCarRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes")); // ✅ Settings route
app.use("/api/users", require("./routes/userRoutes")); // ✅ User management route
app.use('/api/leads',  require("./routes/leadRoutes"));       // Leads માટે
app.use('/api/testdrives', require('./routes/testDriveRoutes'));
app.use('/api/buybacks', require('./routes/buybackRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
