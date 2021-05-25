/**
 * Check if given array of seats has seat with given cords.
 * @param {array} seats - Array of seats.
 * @param {x}
 * @param {y}
 * @returns {boolean}
 */
export function includes(seats, x, y) {
    return (
        typeof seats.find((seat) => {
            return seat["cords"]["x"] === x && seat["cords"]["y"] === y;
        }) != "undefined"
    );
}

/**
 * Count available seats given an object of seats.
 * @param {object} seats
 * @returns {number}
 */
export function countAvailableSeats(seats) {
    var counter = 0;
    for (const seat of seats) {
        if (!seat["reserved"]) {
            ++counter;
        }
    }
    return counter;
}

/**
 * Count available seats given an array of arrays of seats.
 * @param {array} seats
 * @returns {number}
 */
export function countLoadedAvailableSeats(seats) {
    var counter = 0;
    seats.forEach((row) => {
        row.forEach((seat) => {
            if (!seat["reserved"]) {
                ++counter;
            }
        });
    });
    return counter;
}
