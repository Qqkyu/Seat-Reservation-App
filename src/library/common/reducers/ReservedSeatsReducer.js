const reservedSeats = (state = [], action) => {
    switch (action.type) {
        case "SET_SEAT_AS_RESERVED":
            return [...state, action.payload];
        case "SET_SEAT_AS_AVAILABLE":
            return state.filter((seatId) => {
                return seatId !== action.payload;
            });
        default:
            return state;
    }
};

export default reservedSeats;
