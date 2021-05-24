const availableSeatsLoaded = (state = false, action) => {
    switch (action.type) {
        case "SET_AVAILABLE_SEATS_LOADED":
            return action.payload;
        default:
            return state;
    }
};

export default availableSeatsLoaded;
