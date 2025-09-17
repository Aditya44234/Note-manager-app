import dotenv from "dotenv";

dotenv.config();

// Load environment variables from.env file
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

export { MONGODB_URL, PORT };
    