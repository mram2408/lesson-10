import { Router } from "express";
const router = Router();

import CarValidator from "../validators/carValidator.mjs";
import OwnerController from "../controllers/ownerController.mjs";
import { checkSchema } from "express-validator";

import upload from "../middleware/UploadManager.mjs";

import CarController from "../controllers/carController.mjs";
import { ensureAdmin, ensureAuthenticated } from "../middleware/auth.mjs";

router.get("/", CarController.autopark);
router.get("/add", ensureAuthenticated, ensureAdmin, CarController.createCar);
router.post(
  "/",
  upload.single("photo"),
  checkSchema(CarValidator.carSchema),
  CarController.addCar
);
router.delete(
  "/deleteCar",
  ensureAuthenticated,
  ensureAdmin,
  CarController.deleteCar
);
router.get(
  "/edit/:id",
  ensureAuthenticated,
  ensureAdmin,
  CarController.updateCarForm
);
router.post(
  "/edit/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("photo"),
  checkSchema(CarValidator.carSchema),
  CarController.updateCar
);

router.get("/owners", OwnerController.owners);
router.get(
  "/owners/add",
  ensureAuthenticated,
  ensureAdmin,
  OwnerController.createOwnerForm
);
router.get(
  "/owners/edit/:id",
  ensureAuthenticated,
  ensureAdmin,
  OwnerController.updateOwnerForm
);
router.post(
  "/owners/edit/:id",
  ensureAuthenticated,
  ensureAdmin,
  OwnerController.updateOwner
);

router.post(
  "/owners/add",
  ensureAuthenticated,
  ensureAdmin,
  OwnerController.addOwner
);
router.delete(
  "/owners/delete",
  ensureAuthenticated,
  ensureAdmin,
  OwnerController.deleteOwner
);

export default router;
