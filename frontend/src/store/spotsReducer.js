
const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT'

const load = (list) => ({
    type: LOAD,
    list,
});
const add = (spot) => ({
    type: ADD,
    spot: spot
})
const edit = (spot) => ({
    type: EDIT,
    spot: spot
})
const initialState = {}
export const getSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};
export const getSpotsDetail = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
    }
};
export const createSpot = (data) => async (dispatch) => {
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const spot = await response.json()
    dispatch(add(spot))
    return spot
}
export const editSpot = (spotToUpdate) => async (dispatch) => {
    const req = await fetch(`/api/spots/${spotToUpdate.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spotToUpdate)
    })
    const data = req.json()
    const spot = data
    dispatch(edit(spot))
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = { ...state }
            action.list.Spots.forEach(spot => allSpots[spot.id] = spot);
            return { ...allSpots, ...state }
        case ADD:
            if (!state[action.list.id]) {
                const newState = {
                    ...state,
                    [action.list.id]: action.list
                }
                return newState
            }
            return {
                ...state,
                [action.list.id]: {
                    ...state[action.list.id],
                    ...action.list
                }
            }
        case EDIT:
            const editedState = { ...state }
            editedState[action.list.id] = action.list
            return editedState
        default:
            return state
    }
}

export default spotsReducer;
