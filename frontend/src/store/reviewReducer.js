import { csrfFetch } from "./csrf";

const ADD = "reviews/ADD"
const SPOT_LOAD = "reviews/SPOT_LOAD"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"
const EDIT = "reviews/EDIT"
const CLEANER = "reviews/CLEANER"

const spotLoad = (reviews) => ({
    type: SPOT_LOAD,
    reviews
})
const add = (review) => ({
    type: ADD,
    review
})
const editReview = (review) => ({
    type: EDIT,
    review
})
const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})
export const cleanUp = () => ({
    type: CLEANER
})
export const getReviewsbyUser = () => async (dispatch) => {
    console.log('in get reviews by user')
    const response = await csrfFetch('/api/reviews/current')
    if (response.ok) {
        const reviews = await response.json()
        dispatch(spotLoad(reviews))
    }
}
export const deleteReview = (reviewId) => async (dispatch) => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    dispatch(removeReview(reviewId))
    return reviewId
}

export const getReviewsBySpot = (spotId) => async (dispatch) => {
    console.log('in get spot reviews thunk', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        console.log('in getReviews return', reviews)
        dispatch(spotLoad(reviews))
    }
}
export const createReview = (data) => async (dispatch) => {
    const { spotId, reviewDetails, stars } = data
    console.log('create review thunk running', data)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: reviewDetails, stars: stars })
    })
    const review = await response.json()
    console.log('this is returned review in create a review thunk', review)
    dispatch(add(review))
    return review
}
export const editReviewThunk = (datas) => async (dispatch) => {
    const { reviewId, data } = datas
    console.log('edit review thunk running', datas, data, reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const reviewed = await response.json()
    console.log('this is returned review in edit a review thunk', reviewed)
    dispatch(editReview(reviewed))
    return reviewed
}

const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOT_LOAD:
            let allSpotReviews = {}
            action.reviews.Reviews.forEach(review => allSpotReviews[review.id] = review)
            return allSpotReviews
        case ADD:
            console.log('add case running in review reducer', action)
            return {
                ...state,
                [action.review.id]: action.review
            }
        case EDIT:
            console.log('add case running in review reducer', action)
            return {
                ...state,
                [action.review.id]: action.review
            }
        case DELETE_REVIEW: {
            const removedState = { ...state };
            delete removedState[action.reviewId]
            return removedState
        }
        case CLEANER:
            return { ...initialState }
        default:
            return state
    }
}

export default reviewReducer
