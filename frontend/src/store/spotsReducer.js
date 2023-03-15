import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT'
const ADD_IMAGE = '/spots/ADD_IMAGE'
const load = (list) => ({
    type: LOAD,
    list,
});
const add = (spot) => ({
    type: ADD,
    spot
})
const addToSpot = (spotImages) => ({
    type: ADD_IMAGE,
    spot: spotImages
})
const edit = (spot) => ({
    type: EDIT,
    spot: spot
})
const initialState = {}
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};
export const getSpotsDetail = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
    }
};
export const createSpot = (data) => async (dispatch) => {
    console.log('create spot thunk running')
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const spot = await response.json()
    console.log('this is returned spot in create spot thunk', spot)
    dispatch(add(spot))
    return spot
}

export const addImage = (data) => async (dispatch) => {
    let { spotId, image } = data
    console.log('add image thunk running', 'spotId', data);
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: image })
    })
    const images = await response.json()
    console.log('this is returned image in add image thunk', images);
    dispatch(addToSpot(images))
    return images
}


export const editSpot = (spotToUpdate) => async (dispatch) => {
    const req = await csrfFetch(`/api/spots/${spotToUpdate.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spotToUpdate)
    })
    const data = await req.json()
    const spot = data
    dispatch(edit(spot))
    return spot
}

const spotsReducer = (state = initialState, action) => {
    console.log('reducer running')
    switch (action.type) {
        case LOAD:
            const allSpots = { ...state }
            action.list.Spots.forEach(spot => allSpots[spot.id] = spot);
            return { ...allSpots, ...state }
        case ADD:
            console.log('add case running in spot reducer', action)
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                }
                return newState
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        case ADD_IMAGE:
            console.log('add image running in spot reducer', action)
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot.SpotImages
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
