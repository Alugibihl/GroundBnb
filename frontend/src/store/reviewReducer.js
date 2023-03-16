import { csrfFetch } from "./csrf";

const ADD = 'reviews/ADD';
const SPOT_LOAD = 'reviews/SPOT_LOAD'

const spotLoad = (spotId) => ({
    type: SPOT_LOAD,
    spotId
})
const add = (review) => ({
    type: ADD,
    review
})
export const getReviewsBySpot = (spotId) => async (dispatch) => {
    console.log('in get spot reviews thunk')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        console.log('in getReviews return', reviews)
        dispatch(spotLoad(reviews))
    }
}
export const createReview = (data) => async (dispatch) => {
    console.log('create spot thunk running')
    const response = await csrfFetch(`/api/spots/${data.id}/reviews`, {
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
const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOT_LOAD:
            let allSpotReviews = { ...state }
            action.review.spotId.forEach(review => allSpotReviews[review.id] = review)
            console.log('inside all spot reviews reducer', allSpotReviews);
            return { ...allSpotReviews }
        case ADD:
            console.log('add case running in review reducer', action)
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            }

        default:
            return state
    }
}

export default reviewReducer
