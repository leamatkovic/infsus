const { prisma } = require(".");

function rideMapper(ride) {
    return {
        idRide: ride.idvoznja,
        ticketPrice: ride.cijenakarte,
        departure: ride.vrijemepolazak,
        arrival: ride.vrijemedolazak
    };
}

async function getRides() {
    const rides = await prisma.voznja();

    return rides.map((ride) => rideMapper(ride));
}