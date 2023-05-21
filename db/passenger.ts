import Prisma from "@prisma/client";
import { prisma } from ".";

// ako se prebaci sa Prisme na drugi model, interface ostaje isti tj. ne mora se mijenjati data layer
interface IPassenger {
    id: number;
    name: string;
    surname: string;

}

function passengerMapper(passenger: Prisma.putnik): IPassenger {
    return {
        id: passenger.idputnik,
        name: passenger.ime,
        surname: passenger.prezime
    };
}

export async function getPassengerById(idn: number) {
    const passenger = await prisma.putnik.findFirst({
        where: {
            idputnik: idn,
        },
    });

    return passenger && passengerMapper(passenger);
}

export async function getPassengers() {
    const passengers = await prisma.putnik.findMany();

    return passengers.map((passenger) => passengerMapper(passenger));
}

export function getPassengerFullName(passenger: Prisma.putnik) {
    return passenger?.ime + ' ' + passenger?.prezime;
}