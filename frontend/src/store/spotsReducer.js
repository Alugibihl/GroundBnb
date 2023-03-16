import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT'
const ADD_IMAGE = '/spots/ADD_IMAGE'
const PART_LOAD = '/spots/PART_LOAD'
const REMOVE_SPOT = '/spots/REMOVE_SPOT'

const partLoad = (spots) => ({
    type: PART_LOAD,
    spots
})
const load = (list) => ({
    type: LOAD,
    list,
});
const add = (spot) => ({
    type: ADD,
    spot
})
const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
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
export const getUserSpots = () => async (dispatch) => {
    console.log('in get user spots thunk')
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
        const spots = await response.json();
        console.log('in get userspot response', spots);
        dispatch(partLoad(spots));
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
export const deleteSpot = (spotId) => async (dispatch) => {
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    dispatch(removeSpot(spotId))
    return spotId
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
    let { spotAspects, spotsId } = spotToUpdate
    let id = spotsId
    console.log(id)
    const req = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spotAspects)
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
        case PART_LOAD:
            const allUserSpots = {}
            action.spots.spots.forEach(spot => allUserSpots[spot.id] = spot);
            return { ...allUserSpots }
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
            editedState[action.spot.id] = action.spot
            return editedState
        case REMOVE_SPOT: {
            const removedState = { ...state };
            let states = Object.values(removedState)
            for (let place of states) {
                if (place.spotId === action.spotId) {
                    delete removedState[place.id]
                }
            }
            return removedState
        }
        default:
            return state
    }
}

export default spotsReducer;
