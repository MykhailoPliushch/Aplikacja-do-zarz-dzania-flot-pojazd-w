export class VehiclesService {
  private vehicles: any[] = [];

  async findAll() {
    return this.vehicles;
  }

  async create(vehicle: any) {
    this.vehicles.push(vehicle);
    return vehicle;
  }
}
