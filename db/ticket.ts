import Prisma from "@prisma/client";
import { prisma } from ".";
import { getPassengerFullName, getPassengerById } from "./passenger";



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
    idPassenger: number;

}

function ticketMapper(ticket: Awaited<ReturnType<typeof getTicketsFromDb>>[number]): ITicket {
    return {
        id: ticket.idkarta,
        class: ticket.razred,
        discount: ticket.popust,
        passengerFullName: getPassengerFullName(ticket.putnik),
        idPassenger: ticket.putnik.idputnik


    };
}

export async function getTicketById(idTicket: number) {
    const ticket = await prisma.karta.findUnique({
        where: {
            idkarta: idTicket
        },
        select: {
            putnik: true,
            popust: true,
            razred: true,
            idkarta: true
        }
    });

    return ticket && ticketMapper(ticket);
}


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

    return tickets.map((ticket) => ticketMapper(ticket));
}

export async function deleteTicketById(idTicket: number) {
    await prisma.karta.delete({
        where: {
            idkarta: idTicket
        }
    });
}

export async function updateTicket(idTicket: number, newData: any) {
    await prisma.karta.update({
        where: {
            idkarta: idTicket
        },
        data: {
            razred: parseInt(newData.class),
            putnik: {
                connect: {
                    idputnik: parseInt(newData.passenger) // jer je"idputnik" is the primary key u tablici putnik
                }
            }

        }
    });
}

interface ICreateTicket {
    class: number;
    discount: number;
    passengerId: number;
    rideId: number;
}

export async function addTicket(payload: ICreateTicket) {
    await prisma.karta.create({
        data: {
            razred: payload.class,
            popust: payload.discount,
            idvoznja: payload.rideId,
            idputnik: payload.passengerId,
        },
    });
}