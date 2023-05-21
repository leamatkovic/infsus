import { getRide, getRides } from '../../db/ride';
import { Request, Response, NextFunction } from 'express';
import { addTicket, getTicketById, getTickets, getTicketsByIdRide, updateTicket } from '../../db/ticket';
import { getPassengers } from '../../db/passenger';


export const engine = "ejs"

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.ticket_id;

    var ticket = getTicketById(parseInt(id));

    res.render('edit', { ticket: await ticket, passengers: await getPassengers() });
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    var newTicketData = req.body.ticket;
    var id = req.params.ticket_id;

    updateTicket(parseInt(id), newTicketData);
    console.log(newTicketData);

    res.redirect('/rides');


};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    console.log('newData:', req.body);

    const rideId = parseInt(req.body["ride-id"])

    addTicket({
        rideId,
        class: parseInt(req.body.class),
        discount: parseFloat(req.body.discount),
        passengerId: parseInt(req.body.passenger)
    });

    res.redirect('/ride/' + rideId);
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    await deleteTicketById(parseInt(req.params.ticket_id))

    res.redirect('/rides');
}


