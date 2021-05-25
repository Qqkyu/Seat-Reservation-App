const availableSeats = (state = [], action) => {
    switch (action.type) {
        case "SET_AVAILABLE_SEATS":
            return action.payload;
        case "RESERVE_SEAT": {
            const seatRow = action.payload["cords"]["x"];
            let rowCount = 0;
            return state.map((row) => {
                /* Only check row of given seat */
                if (rowCount === seatRow) {
                    /* Seat in current row - change reserved field */
                    ++rowCount;
                    return row.map((seat) => {
                        const seatId = action.payload["id"];
                        if (seat["id"] === seatId) {
                            seat["reserved"] = true;
                        }
                        return seat;
                    });
                } else {
                    ++rowCount;
                    return row;
                }
            });
        }
        default:
            return state;
    }
};

export default availableSeats;
