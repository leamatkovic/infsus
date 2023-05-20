import Prisma from "@prisma/client";
import { prisma } from ".";

interface IRide {
    idRide: number;
    ticketPrice: number;
    departure: Date;
    arrival: Date;
}

function rideMapper(ride: Prisma.voznja): IRide {
    return {
        idRide: ride.idvoznja,
        ticketPrice: ride.cijenakarte,
        departure: ride.vrijemepolazak,
        arrival: ride.vrijemedolazak
    };
}

export async function getRides() {
    const rides = await prisma.voznja.findMany();

    return rides.map((ride) => rideMapper(ride));
}