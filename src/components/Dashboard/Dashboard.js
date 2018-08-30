import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./Dashboard.css";
import Poll from '../PollSummary';

class Dashboard extends Component {
    render() {
        const {notAnsweredQIds, answeredQIds} = this.props
        return (
            <div id="dashboard">
                <div id="notAnswered">
                    <h3>Not Answered</h3>
                    <ul>
                        {notAnsweredQIds.map((questionId) => (
                            <li key={questionId}><Poll id={questionId}/></li>
                        ))}
                    </ul>
                </div>
                <div id="answered">
                    <h3>Answered</h3>
                    <ul>
                        {answeredQIds.map((questionId) => (
                            <li key={questionId}><Poll id={questionId}/></li>
                        ))}
                    </ul>
                    </div>
            </div>
        )
    }
}
function mapStateToProps({questions, authedUser}) {

    const notAnsweredQuestions = Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))

    const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    )

    return {
        notAnsweredQIds: Object.values(notAnsweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        answeredQIds: Object.values(answeredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard)