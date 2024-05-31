import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Error: ", error);

    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error: ", error);

    res.json({ success: false, message: "Error" });
  }
};

// Remove foodItem
const removeFood = async (req, res) => {
  try {
    // find foodItem using ID
    const food = await foodModel.findById(req.body.id);

    // delete from folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // delete from the database
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error: ", error);

    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
