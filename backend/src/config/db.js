import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://food_delivery_app:56943297816495213@cluster0.oflfi81.mongodb.net/food_del"
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
};
