const reservedSeats = (state = [], action) => {
    switch (action.type) {
        case "SET_SEAT_AS_RESERVED":
            return [...state, action.payload];
        case "SET_SEAT_AS_AVAILABLE":
            return state.filter((seat) => {
                const seatId = action.payload["id"];
                return seat["id"] !== seatId;
            });
        default:
            return state;
    }
};

export default reservedSeats;
