import {
    ADD_ANSWER_TO_QUESTIONS,
    ADD_QUESTION,
    RECEIVE_QUESTIONS
} from "../actions/questions";

export default function questions(state = {}, actions) {
    switch (actions.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...actions.questions
            };
        case ADD_ANSWER_TO_QUESTIONS:
            const {authedUser, id, answer} = actions;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [answer]: {
                        ...state[id].answer,
                        votes: state[id][answer].votes.concat(authedUser)
                    }
                }
            }
        case ADD_QUESTION:
            const {question} = actions;
            return {
                ...state,
                [question.id]: question
            }
        default:
            return state;
    }
}
