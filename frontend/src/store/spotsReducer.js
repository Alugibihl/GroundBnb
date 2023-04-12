import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT'
const ADD_IMAGE = 'spots/ADD_IMAGE'
const PART_LOAD = 'spots/PART_LOAD'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'
const CLEANER = 'spots/CLEANUP'

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
        console.log('spot in get spots thunk', spot);
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
    let { spotId, imagehold } = data
    for (let i = 0; i < imagehold.length; ++i) {
        let image = imagehold[i]
        console.log('add image thunk running', image, image.url, image.previewImage, 'spotId', data);
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: image.url, previewImage: image.previewImage })
        })
        const images = await response.json()
        console.log('this is returned image in add image thunk!!!!!', images);
        dispatch(addToSpot(images))
    }
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
    const spot = await req.json()
    dispatch(edit(spot))
    return spot
}
const initialState = {}
const spotsReducer = (state = initialState, action) => {
    console.log('reducer running')
    switch (action.type) {
        case LOAD:
            const allSpots = { ...state }
            action.list.Spots.forEach(spot => allSpots[spot.id] = spot);
            return { ...state, ...allSpots }
        case PART_LOAD:
            const allUserSpots = {}
            action.spots.spots.forEach(spot => allUserSpots[spot.id] = spot);
            console.log('here is each spot of part load', allUserSpots)
            return { ...allUserSpots }
        case ADD:
            // if (!state[action.spot.id]) {
            const newState = { ...state, [action.spot.id]: action.spot }
            return newState
        //} const newState = {
        //     ...state,
        //     [action.spot.id]: {
        //         ...state[action.spot.id],
        //         ...action.spot
        //     }
        // }
        // console.log('HEY !! ITS RUNNING !!! ITS ACTUALLY RUNNIONG!!!!!!!!!!S')
        // return newState
        case ADD_IMAGE:
            console.log('add image running in spot reducer', action)
            const newerState = {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot.SpotImages
                }
            }
            console.log('this is the add image newer state', newerState);
            return newerState
        case EDIT:
            const editedState = { ...state }
            editedState[action.spot.id] = action.spot
            return editedState
        case REMOVE_SPOT: {
            const removedState = { ...state };
            delete removedState[action.spotId]
            return removedState
        }
        case CLEANER:
            return { ...initialState }
        default:
            return state
    }
}

export default spotsReducer;
