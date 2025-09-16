import { Express } from "express";
import { UsersController } from "./modules/users/users.controller";
import { VehiclesController } from "./modules/vehicles/vehicles.controller";

export function AppModule(app: Express) {
  UsersController(app);
  VehiclesController(app);
}
