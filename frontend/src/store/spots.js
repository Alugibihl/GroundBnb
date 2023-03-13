


const LOAD = "spots/LOAD";

const load = (list) => ({
    type: LOAD,
    list,
});

export const getSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots.js`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};





const initialState = {}
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {}
            action.list.forEach(spot => allSpots[spot.id] = spot);
            console.log('spotsss', allSpots)
            return { ...allSpots, ...state }
        default:
            return state
    }
}





export default spotsReducer;
