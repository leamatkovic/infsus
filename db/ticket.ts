import Prisma from "@prisma/client";
import { prisma } from ".";
import { getPassengerFullName } from "./passenger";



function getTicketsFromDb() {
    return prisma.karta.findMany({
        select: {
            putnik: true,
            popust: true,
            razred: true,
            idkarta: true
        }
    });
}

// ako se prebaci sa Prisme na drugi model, interface ostaje isti tj. ne mora se mijenjati data layer
interface ITicket {
    id: number;
    class: number;
    discount: number | null;
    passengerFullName: string;

}

function ticketMapper(ticket: Awaited<ReturnType<typeof getTicketsFromDb>>[number]): ITicket {
    return {
        id: ticket.idkarta,
        class: ticket.razred,
        discount: ticket.popust,
        passengerFullName: getPassengerFullName(ticket.putnik)


    };
}
prisma.karta
export async function getTicketsByIdRide(idRide: number) {
    const tickets = await prisma.karta.findMany({
        where: {
            idvoznja: idRide
        },
        select: {
            putnik: true,
            popust: true,
            razred: true,
            idkarta: true
        }
    });

    return tickets.map((ticket) => ticketMapper(ticket));
}

export async function getTickets() {
    const tickets = await getTicketsFromDb();

    console.log({ tickets })

    return tickets.map((ticket) => ticketMapper(ticket));
}