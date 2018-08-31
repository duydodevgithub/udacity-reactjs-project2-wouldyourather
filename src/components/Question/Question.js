import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAnswerQuestion} from '../../actions/questions';
import "./Question.css";
import Option from "./Option";

class NOTFOUNDQUESTION extends Component {
    render() {
        return (
            <div>
                <h1>404:Question not found</h1>
            </div>
        )
    }
}

class Question extends Component {
    state = {
        vote: false
    }

    handleVote = (vote) => {
        const {dispatch, question} = this.props
        dispatch(handleAnswerQuestion(question.id, vote))
    }

    render() {
        const {question} = this.props
        return (
            <div>
                {question
                    ?
                    (<div>
                            <h3>Would you rather? </h3>
                        <table>
                            <tr>
                                <th>
                                    <Option questionId={question.id} optionName="optionOne" onClick={this.handleVote}/>
                                </th>
                                
                                <th>
                                    <Option questionId={question.id} optionName="optionTwo" onClick={this.handleVote}/>
                                </th>
                            </tr>
                        </table>
                    </div>)
                    : <NOTFOUNDQUESTION/>}
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id]
    const user = users[authedUser]

    return {
        question,
        authedUser,
        showResults: Object.keys(user.answers).includes(question_id)
    }
}

export default connect(mapStateToProps)(Question)