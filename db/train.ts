import Prisma from "@prisma/client";
import { prisma } from ".";

// ako se prebaci sa Prisme na drugi model, interface ostaje isti tj. ne mora se mijenjati data layer
interface IRide {
    id: number;
    ticketPrice: number;
    departure: Date;
    arrival: Date;

}

function rideMapper(ride: Prisma.voznja): IRide {
    return {
        id: ride.idvoznja,
        ticketPrice: ride.cijenakarte,
        departure: ride.vrijemepolazak,
        arrival: ride.vrijemedolazak
    };
}

export async function getTrains() {
    const rides = await prisma.voznja.findMany();

    console.log({ rides })

    return rides.map((ride) => rideMapper(ride));
}
