const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables")
    }
    
    console.log("Attempting to connect to MongoDB...")
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    // DON'T exit process in production (this causes crash)
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
  }
}

module.exports = connectDB