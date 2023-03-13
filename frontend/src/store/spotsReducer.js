
const LOAD = "spots/LOAD";

const load = (list) => ({
    type: LOAD,
    list,
});
const initialState = {}
export const getSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};


const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = { ...state }
            action.list.Spots.forEach(spot => allSpots[spot.id] = spot);
            return { ...allSpots, ...state }
        default:
            return state
    }
}





export default spotsReducer;
