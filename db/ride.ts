import Prisma from "@prisma/client";
import { prisma } from ".";

// ako se prebaci sa Prisme na drugi model, interface ostaje isti tj. ne mora se mijenjati data layer
interface IRide {
    id: number;
    ticketPrice: number;
    departure: Date;
    arrival: Date;
    train: number;

}

function rideMapper(ride: Prisma.voznja): IRide {
    return {
        id: ride.idvoznja,
        ticketPrice: ride.cijenakarte,
        departure: ride.vrijemepolazak,
        arrival: ride.vrijemedolazak,
        train: ride.idvlak
    };
}

export async function getRides() {
    const rides = await prisma.voznja.findMany();

    console.log({ rides })

    return rides.map((ride) => rideMapper(ride));
}

export async function getRide(idn: number) {
    const ride = await prisma.voznja.findUnique({
        where: {
            idvoznja: idn,
        },
    });

    return ride && rideMapper(ride);
}
export function getPassengerFullName(passenger: Prisma.putnik) {
    return passenger?.ime + ' ' + passenger?.prezime;
}