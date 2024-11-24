import CRUDManager from "../CRUDManager.mjs";
import Car from "./Vehicle.mjs";

class CarsDBService extends CRUDManager {}
export default new CarsDBService(Car);
