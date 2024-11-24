import CRUDManager from "../CRUDmanager.mjs";
import Owner from "./Owner.mjs";

class OwnersDBService extends CRUDManager {}
export default new OwnersDBService(Owner);
