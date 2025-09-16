import { Express, Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";

const vehiclesService = new VehiclesService();

export function VehiclesController(app: Express) {
  app.get("/vehicles", async (req: Request, res: Response) => {
    res.json(await vehiclesService.findAll());
  });

  app.post("/vehicles", async (req: Request, res: Response) => {
    const vehicle = await vehiclesService.create(req.body);
    res.json(vehicle);
  });
}
