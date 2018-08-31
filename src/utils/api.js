import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "./_DATA";

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
        // console.log(users, question)
    }))

}

export function saveQuestion(question) {
    return _saveQuestion(question)
}

export function saveQuestionAnswer(authedUser, qid, answer) {
    console.log(authedUser, qid, answer);
    return _saveQuestionAnswer(
        {
            authedUser,
            qid,
            answer
        }
    )
}
