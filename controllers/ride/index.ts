import { getRide, getRides } from '../../db/ride';
import { Request, Response, NextFunction } from 'express';
import { getTickets, getTicketsByIdRide } from '../../db/ticket';


export const engine = "ejs"

export const list = async (req: Request, res: Response, next: NextFunction) => {
    res.render('list', { rides: await getRides() });
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.ride_id;

    console.log({ id });

    var ride = getRide(parseInt(id));
    var tickets = getTicketsByIdRide(parseInt(id));

    res.render('show', { ride: await ride, tickets: await tickets });
};


