/**
 * Save mapped Seats fetched from API and optionally modify them.
 */
const availableSeats = (state = [], action) => {
    switch (action.type) {
        case "SET_AVAILABLE_SEATS": {
            /* Save Seats */
            return action.payload;
        }
        case "RESERVE_SEAT": {
            /* Mark given seat as reserved */

            const seatRow = action.payload["cords"]["x"];
            /* Keep count of current row */
            let curRow = 0;

            return state.map((row) => {
                /* Only check row of the given seat */
                if (curRow === seatRow) {
                    ++curRow;
                    /* Passed-in seat is in the current row - change "reserved" field */
                    return row.map((seat) => {
                        const seatId = action.payload["id"];
                        /* Change only passed-in seat */
                        if (seat["id"] === seatId) {
                            seat["reserved"] = true;
                        }
                        return seat;
                    });
                } else {
                    /* Don't make any changes to other rows */
                    ++curRow;
                    return row;
                }
            });
        }
        default:
            return state;
    }
};

export default availableSeats;
