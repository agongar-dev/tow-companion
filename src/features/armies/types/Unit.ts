import { UnitCategory } from "./UnitCategory";

// The base description of a unit independently of the composition used in the army list
export interface Unit {
  id: string; // id of the unit of the game rules
  name: string; // name of the unit. Not modifiable
  image?: string; // representative image of the unit
  category: UnitCategory;
}
