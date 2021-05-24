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
