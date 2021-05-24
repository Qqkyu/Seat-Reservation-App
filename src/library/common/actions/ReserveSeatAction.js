export const reserveSeat = (seat) => {
    return {
        type: "SET_SEAT_AS_RESERVED",
        payload: seat,
    };
};

export const setSeatAvailable = (seat) => {
    return {
        type: "SET_SEAT_AS_AVAILABLE",
        payload: seat,
    };
};
