import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./Dashboard.css";
import Poll from '../PollSummary';

class Dashboard extends Component {
    render() {
        const {notAnsweredQIds, answeredQIds} = this.props
        console.log(this.props);
        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="panel panel-default">
                        <div className="panel-heading">Not Answered</div>
                        <ul>
                            {notAnsweredQIds.map((questionId) => (
                                <li key={questionId}><Poll id={questionId}/></li>
                            ))}
                        </ul>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Answered</div>
                        <ul>
                            {answeredQIds.map((questionId) => (
                                <li key={questionId}><Poll id={questionId}/></li>
                            ))}
                        </ul>
                        </div>
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