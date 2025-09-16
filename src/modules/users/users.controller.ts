import { Express, Request, Response } from "express";
import { UsersService } from "./users.service";

const usersService = new UsersService();

export function UsersController(app: Express) {
  app.get("/users", async (req: Request, res: Response) => {
    res.json(await usersService.findAll());
  });

  app.post("/users", async (req: Request, res: Response) => {
    const user = await usersService.create(req.body);
    res.json(user);
  });
}
