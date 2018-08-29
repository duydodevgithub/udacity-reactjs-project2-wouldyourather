import {getInitialData} from "../utils/api"
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";

//get user and questions
export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}