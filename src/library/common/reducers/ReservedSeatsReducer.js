const reservedSeats = (state = [], action) => {
    switch (action.type) {
        case "SET_SEAT_AS_RESERVED": {
            if (
                typeof state.find(
                    (seat) => seat["id"] === action.payload["id"]
                ) == "undefined"
            ) {
                return [...state, action.payload];
            }
            return state;
        }
        case "SET_SEAT_AS_AVAILABLE":
            return state.filter((seat) => {
                const seatId = action.payload["id"];
                return seat["id"] !== seatId;
            });
        case "CLEAR_CHOSEN_SEATS_CACHE": {
            return [];
        }
        default:
            return state;
    }
};

export default reservedSeats;
