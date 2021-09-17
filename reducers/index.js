import { ADD_REVIEW, DELETE_REVIEW } from "../actions/types";

const initialState = {
    itemList: [
        {title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1'},
        {title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2'}
    ]
}

// action creator
export const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
});

export const deleteReview = id => ({
    type: DELETE_REVIEW,
    payload: id
});

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REVIEW:
            return {
                ...state,
                itemList: state.itemList.concat({
                    key: Math.random().toString(),
                    title: action.payload.title,
                    body: action.payload.body,
                    rating: action.payload.rating
                })
            }
        case DELETE_REVIEW:
            return {
                ...state,
                itemList: state.itemList.filter(item => item.key !== action.payload)
            }
        default:
            return state
    }
};

export default rootReducer;