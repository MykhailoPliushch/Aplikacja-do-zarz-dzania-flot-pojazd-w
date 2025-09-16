import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      role: 'admin',
    },
  });
  console.log('Создан пользователь:', newUser);

  const newVehicle = await prisma.vehicle.create({
    data: {
      vin: '1HGCM82633A004352',
      registration: 'ABC-123',
      make: 'Toyota',
      model: 'Corolla',
      odo: 12000,
    },
  });
  console.log('Создан транспорт:', newVehicle);

  const newLocation = await prisma.location.create({
    data: {
      vehicleId: newVehicle.id,
      lat: 55.7558,
      lon: 37.6173,
      speed: 60,
    },
  });
  console.log('Добавлена локация:', newLocation);

  const vehiclesWithLocations = await prisma.vehicle.findMany({
    include: { locations: true },
  });
  console.log('Все транспортные средства с локациями:', vehiclesWithLocations);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
