import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create or get the driver
  const driver = await prisma.user.upsert({
    where: { email: 'driver@example.com' },
    update: {},
    create: {
      email: 'driver@example.com',
      passwordHash: 'hashed_password',
      role: 'driver',
    },
  });

  // Create or get the vehicle
  const vehicle = await prisma.vehicle.upsert({
    where: { vin: '1HGCM82633A004352' },
    update: {},
    create: {
      vin: '1HGCM82633A004352',
      registration: 'ABC-123',
      make: 'Toyota',
      model: 'Corolla',
      status: 'available',
      odo: 12000,
    },
  });

  // Create a trip
  const trip = await prisma.trip.create({
    data: {
      vehicleId: vehicle.id,
      driverId: driver.id,
      startTime: new Date(),
      startOdo: vehicle.odo,
      description: 'Delivery of parts to warehouse',
    },
  });
  console.log('Trip created:', trip);

  // Add a location for the vehicle
  const location = await prisma.location.create({
    data: {
      vehicleId: vehicle.id,
      lat: 52.2297,
      lon: 21.0122,
      speed: 50,
    },
  });
  console.log('Location added:', location);

  // Fetch all vehicles with their trips and locations
  const vehicles = await prisma.vehicle.findMany({
    include: { locations: true, trips: true },
  });
  console.log('All vehicles with data:', vehicles);
}

// Run the script and disconnect Prisma
main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
