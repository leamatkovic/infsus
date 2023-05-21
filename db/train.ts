import Prisma from "@prisma/client";
import { prisma } from ".";

// ako se prebaci sa Prisme na drugi model, interface ostaje isti tj. ne mora se mijenjati data layer
interface ITrain {
    id: number;
}

function trainMapper(train: Prisma.voznja): ITrain {
    return {
        id: train.idvoznja,
    };
}

export async function getTrains() {

    const trains = await prisma.voznja.findMany();
    return trains.map((train) => trainMapper(train));
}

export async function getTrainByRideId(idn: number) {

    const trains = await prisma.voznja.findFirst()
}
