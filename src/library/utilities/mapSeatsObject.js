/**
 * Map seats array into seats array of arrays where x cords are indices.
 * @param {object} seats - The available seats fetched from the API.
 * @returns {array}
 */
function mapSeatsObject(seats) {
    const seatsArray = [];

    for (const seat of seats) {
        const row = seat["cords"]["x"];
        // Check whether there are any seats at current row
        if (typeof seatsArray[row] != "undefined") {
            seatsArray[row].push(seat);
        } else {
            seatsArray[row] = [seat];
        }
    }

    return seatsArray;
}

export default mapSeatsObject;
