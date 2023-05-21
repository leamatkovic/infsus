import { getRide, getRides } from '../../db/ride';
import { Request, Response, NextFunction } from 'express';
import { getTicketById, getTickets, getTicketsByIdRide, updateTicket } from '../../db/ticket';
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


