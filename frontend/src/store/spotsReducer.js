import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT'
const PART_LOAD = 'spots/PART_LOAD'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'
const CLEANER = 'spots/CLEANUP'
const SEARCH = 'spots/SEARCH';

const search = (query) => ({
    type: SEARCH,
    query,
});
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
const edit = (spot) => ({
    type: EDIT,
    spot: spot
})
export const spotCleanUp = () => ({
    type: CLEANER
})

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};
export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
        const spots = await response.json();
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
    const response = await csrfFetch('/api/spots', {
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
    let { spotId, imagehold } = data
    for (let i = 0; i < imagehold.length; ++i) {
        let image = imagehold[i]
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: image.url, preview: image.preview })
        })
        if (!response.ok) return
        const images = await response.json()
        // console.log('this is returned image in add image thunk!!!!!', images);
    }
    dispatch(getSpotsDetail(spotId))
    return true
}

export const editSpot = (spotToUpdate) => async (dispatch) => {
    let { spotAspects, spotsId } = spotToUpdate
    let id = spotsId
    const req = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spotAspects)
    })
    const spot = await req.json()
    dispatch(edit(spot))
    return spot
}
const initialState = {}
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = { ...state }
            action.list.Spots.forEach(spot => allSpots[spot.id] = spot);
            return { ...state, ...allSpots }
        case PART_LOAD:
            const allUserSpots = {}
            action.spots.spots.forEach(spot => allUserSpots[spot.id] = spot);
            return { ...allUserSpots }
        case ADD:
            const newState = { ...state, [action.spot.id]: action.spot }
            return newState
        case EDIT:
            const editedState = { ...state }
            editedState[action.spot.id] = action.spot
            return editedState
        case REMOVE_SPOT: {
            const removedState = { ...state };
            delete removedState[action.spotId]
            return removedState
        }
        case SEARCH: {
            const { query } = action;
            const searchResults = Object.values(state).filter((spot) =>
                spot.title.toLowerCase().includes(query.toLowerCase())
            );
            return {
                ...state,
                searchResults,
            };
        }
        case CLEANER:
            return { ...initialState }
        default:
            return state
    }
}

export default spotsReducer;
