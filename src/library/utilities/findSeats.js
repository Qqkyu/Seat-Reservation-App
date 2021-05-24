/**
 * Find given amount of seats.
 * @param {array} row - Array of seats in single row.
 * @returns {array} Array of example seats (empty if not found).
 */
function findSeats(row, amount, together = false) {
    if (together && amount > 1) {
        return findTogetherSeats(row, amount);
    } else {
        return findAnySeats(row, amount);
    }
}

/**
 * Find given amount of seats in given row that are next to each other.
 * @param {array} row - Array of seats in single row.
 * @returns {array} Array of example seats (empty if not found).
 */
function findTogetherSeats(row, amount) {
    var exampleSeats = [];
    const seatsRowAmount = row.length;
    /* Iterate over possible "first" seats */
    for (let curSeat = 0; curSeat <= seatsRowAmount - amount; ++curSeat) {
        /* Push first seat in current iteration to result array */
        exampleSeats.push(row[curSeat]);
        /*
         * Save first seat column in current iteration
         * Start iterating only if first seat is not reserved - set separated flag to true if first seat is
         */
        let [prevSeatCol, separated] = [
            row[curSeat]["cords"]["y"],
            row[curSeat]["reserved"],
        ];
        for (let i = 1; i < amount && !separated; ++i) {
            /* Check if current seat is not reserved */
            if (row[curSeat + i]["reserved"]) {
                separated = true;
            } else {
                /* Save current seat's column and compare with previous seat's column */
                const curSeatCol = row[curSeat + i]["cords"]["y"];
                if (prevSeatCol + 1 !== curSeatCol) {
                    /* Seats are separated, break the loop */
                    separated = true;
                } else {
                    /* Seats are next to each other, add seats to result and update prevSeatCol */
                    exampleSeats.push(row[curSeat + i]);
                    prevSeatCol = curSeatCol;
                }
            }
        }
        /* Check loop result */
        if (separated) {
            /* Reset result array */
            exampleSeats = [];
        } else {
            /* Found given amount of seats next to each other - return result */
            return exampleSeats;
        }
    }
    /* Unable to find amount of given seats next to each other - return empty array */
    return [];
}

/**
 * Find given amount of seats in given row (not necessarily next to each other).
 * @param {array} row - Array of seats in single row.
 * @returns {array} Array of example seats (empty if not found).
 */
function findAnySeats(row, amount) {
    var exampleSeats = [];
    const seatsRowAmount = row.length;
    /* Iterate over all seats in given row */
    for (
        let curSeat = 0;
        curSeat < seatsRowAmount && exampleSeats.length < amount;
        ++curSeat
    ) {
        const seat = row[curSeat];
        /* Add seat only if it is not already reserved */
        if (!seat["reserved"]) {
            exampleSeats.push(seat);
        }
    }
    /* Return example seats even if it has less seats than given amount */
    return exampleSeats;
}

export default findSeats;
