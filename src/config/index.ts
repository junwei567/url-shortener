import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  keepAlive: true,
  socketTimeoutMS: 30000,
  autoIndex: false,
}

const MONGO = {
  options: MONGO_OPTIONS,
  url: process.env.CLUSTER_URL || "",
}

const config = {
  mongo: MONGO,
  port: process.env.PORT || 3000,
  domain: process.env.domain || "http://localhost:3000/",
}

export default config;