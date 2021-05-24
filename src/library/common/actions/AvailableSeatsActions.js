export const setAvailableSeats = (availableSeats) => {
    return {
        type: "SET_AVAILABLE_SEATS",
        payload: availableSeats,
    };
};

export const availableSeatsLoaded = (set) => {
    return {
        type: "SET_AVAILABLE_SEATS_LOADED",
        payload: set,
    };
};
