export const reserveSeat = (seatId) => {
    return {
        type: "SET_SEAT_AS_RESERVED",
        payload: seatId,
    };
};

export const setSeatAvailable = (seatId) => {
    return {
        type: "SET_SEAT_AS_AVAILABLE",
        payload: seatId,
    };
};
