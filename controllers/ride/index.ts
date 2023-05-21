import { getRide, getRides } from '../../db/ride';
import { Request, Response, NextFunction } from 'express';
import { getTickets, getTicketsByIdRide, deleteTicketById } from '../../db/ticket';


export const engine = "ejs"

export const list = async (req: Request, res: Response, next: NextFunction) => {
    res.render('list', { rides: await getRides() });
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.ride_id;

    var ride = getRide(parseInt(id));
    var tickets = getTicketsByIdRide(parseInt(id));

    res.render('show', { ride: await ride, tickets: await tickets });
};


// export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
//     var id = req.params.ticket_id;

//     try {
//         await deleteTicketById(parseInt(id));
//         res.redirect('/rides');
//         // res.redirect('/ride/'+req.params.ride_id); // Redirect to the desired page after successful deletion
//     } catch (error) {
//         next(error);
//     }
// };






