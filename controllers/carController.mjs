import CarsDBService from "../models/cars/CarsDBService.mjs";
import { validationResult } from "express-validator";
import OwnersDBService from "../models/owner/OwnersDBService.mjs";

class CarController {
  static async autopark(req, res) {
    const carsList = await CarsDBService.getList({}, {}, ["owner"]);
    console.log(req.user);
    res.render("autopark", {
      title: "Автопарк",
      carsList: carsList,
      user: req.user,
    });
  }
  static async createCar(req, res) {
    res.render("addCar", {
      title: "Додати новий автомобіль",
      errors: [],
      carData: {},
      ownersList: await OwnersDBService.getList(),
    });
  }
  static async addCar(req, res) {
    const data = req.body;
    const errors = validationResult(req);
    console.log("====errors====");
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).render("addCar", {
        title: "Додати новий автомобіль",
        errors: errors.array(),
        carData: data,
      });
    }
    const carData = { ...req.body };
    if (req.file?.buffer) carData.imgSrc = req.file.buffer.toString("base64");

    await CarsDBService.create(carData);
    res.redirect("autopark");
  }
  static async deleteCar(req, res) {
    try {
      await CarsDBService.deleteById(req.body.id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete car" });
    }
  }
  static async updateCarForm(req, res) {
    const carData = await CarsDBService.getById(req.params.id);
    res.render("addCar", {
      title: "Змінити дані про авто",
      errors: [],
      carData: carData,
      ownersList: await OwnersDBService.getList(),
    });
  }
  static async updateCar(req, res) {
    const carData = { ...req.body };
    console.log(carData);

    console.log(req.body);

    if (req.file?.buffer) carData.imgSrc = req.file.buffer.toString("base64");
    await CarsDBService.update(req.params.id, carData);
    res.redirect("/autopark");
  }
}

export default CarController;
