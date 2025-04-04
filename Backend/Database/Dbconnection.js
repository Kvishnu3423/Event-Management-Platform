import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "EVENT_MANAGEMENT_MESSAGE" })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error occurred while connecting to database:", err);
      process.exit(1);  // Exit the process in case of a database connection failure
    });
};
