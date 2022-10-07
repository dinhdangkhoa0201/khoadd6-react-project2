import {saveQuestion} from "../utils/api";
import {addQuestionToUser} from "./users";
import {hideLoading, showLoading} from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTIONS";
export const ADD_ANSWER_TO_QUESTIONS = "ADD_ANSWER_TO_QUESTIONS";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addAnswerToQuestion(authedUser, id, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTIONS,
        authedUser,
        id,
        answer
    }
}

export function handleAddQuestion(optionOne, optionTwo, author) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author
        })
        .then(question => {
            dispatch(addQuestion(question));
            dispatch(addQuestionToUser(question))
            dispatch(hideLoading());
        })
    }
}
