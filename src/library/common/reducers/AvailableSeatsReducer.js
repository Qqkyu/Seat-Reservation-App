const availableSeats = (state = {}, action) => {
    switch (action.type) {
        case "SET_AVAILABLE_SEATS":
            return action.payload;
        default:
            return state;
    }
};

export default availableSeats;
