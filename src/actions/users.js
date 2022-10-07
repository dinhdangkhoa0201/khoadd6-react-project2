import {saveQuestionAnswer} from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addQuestionToUser({id, author}) {
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    }
}

export function addAnswerToUser(authedUser, id, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid: id,
        answer
    }
}

export function handleAddAnswerToUser(authedUser, id, answer) {
    return (dispatch) => {
        dispatch(addAnswerToUser(authedUser, id, answer));
        dispatch(addAnswerToUser(authedUser, id, answer));

        return saveQuestionAnswer(authedUser, id, answer)
        .catch(e => {
            console.warn("Error in handleAddAnswerToUser:", e);
        })
    }
}
