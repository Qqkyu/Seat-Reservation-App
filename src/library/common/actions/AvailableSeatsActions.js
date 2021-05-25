export const setAvailableSeats = (availableSeats) => {
    return {
        type: "SET_AVAILABLE_SEATS",
        payload: availableSeats,
    };
};

export const availableSeatsLoaded = (seat) => {
    return {
        type: "SET_AVAILABLE_SEATS_LOADED",
        payload: seat,
    };
};

export const setSeatAsReserved = (seat) => {
    return {
        type: "RESERVE_SEAT",
        payload: seat,
    };
};
