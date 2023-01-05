import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: 
        {
          name: "Presencial",
          price: 250,
          isRemote: false,
          includesHotel: false
        }
    })
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Presencial",
        price: 250,
        isRemote: false,
        includesHotel: true
      }
    })
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Online",
        price: 100,
        isRemote: true,
        includesHotel: false
      }
    })
  }

  let hotels = await prisma.hotel.findFirst()
  if(!hotels){
    hotels = await prisma.hotel.create({
      data: {
        name: "Driven Resort",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcewvO2ESob6z1siAWtZ7T8aIUXV40kklsQ&usqp=CAU",
      }
    })
    hotels = await prisma.hotel.create({
      data: {
        name: "Driven Palace",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcewvO2ESob6z1siAWtZ7T8aIUXV40kklsQ&usqp=CAU",
      }
    })
    hotels = await prisma.hotel.create({
      data: {
        name: "Driven World",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEd1wr1EHctrSg5aC5htxA_clo3486Xmp2Mw&usqp=CAU"
      }
    })
  }

  console.log({ event, ticketType, hotels });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
