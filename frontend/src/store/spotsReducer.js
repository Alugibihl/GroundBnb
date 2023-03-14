
const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const load = (list) => ({
    type: LOAD,
    list,
});
const add = (list) => ({
    type: ADD,
    list
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
    console.log(id);
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
    }
};
export const createSpot = (data) => async (dispatch) => {
    try {
        const response = await fetch('api/spots', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            let error;
            if (response.status === 422) {
                error = await response.json();
                throw new ValidationError(error.errors, response.statusText);
            } else {
                let errorJSON;
                error = await response.text();
                try {
                    errorJSON = JSON.parse(error)
                } catch {
                    throw new Error(error)
                }
                throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
            }
        }
        const spot = await response.json()
        dispatch(add(spot))
        return spot
    } catch (error) {
        throw error
    }
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
        default:
            return state
    }
}

export default spotsReducer;
