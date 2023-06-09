import { deleteRideById, getRide, getRides, updateRide } from '../../db/ride';
import { Request, Response, NextFunction } from 'express';
import { getTickets, getTicketsByIdRide, deleteTicketById, addTicket } from '../../db/ticket';
import { getTrains } from '../../db/train';
import { getPassengers } from '../../db/passenger';


export const engine = "ejs"

export const list = async (req: Request, res: Response, next: NextFunction) => {
    res.render('list', { rides: await getRides() });
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.ride_id;

    var ride = getRide(parseInt(id));
    var tickets = getTicketsByIdRide(parseInt(id));

    res.render('show', { ride: await ride, tickets: await tickets, passengers: await getPassengers(), destroy });
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.ride_id;

    var ride = getRide(parseInt(id));

    res.render('edit', { ride: await ride, trains: await getTrains() });
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    var newRideData = req.body.ride;
    var id = req.params.ride_id;

    updateRide(parseInt(id), newRideData);

    res.redirect('/rides');
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    await deleteRideById(parseInt(req.params.ride_id))

    res.redirect('/rides');
}