import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './Option.css'


class Option extends Component {
    handleClick = (e) => {
        e.preventDefault()
        const {onClick, optionName} = this.props
        onClick(optionName)
    }

    render() {
        const {option, showResults, isVoted, percentage} = this.props

        const {text, votes} = option
        
        return (
            showResults === false ?
                <Link to="#" onClick={this.handleClick}>
                    <div className={isVoted ? ("selected-option") : ''}>
                        <div>
                            <h3>{text}</h3>
                            {showResults === true &&
                            (<p>Number Of Votes: {votes.length} ({percentage}%)</p>)
                            }
                        </div>
                    </div>
                </Link>
                :
                <div className={isVoted ? ("selected-option") : ''}>
                    <div>
                        <h3>{text}</h3>
                        {showResults === true &&
                        (<p>Numbero Of Votes: {votes.length} ({percentage}%)</p>)
                        }
                    </div>
                </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {questionId, optionName}) {
    const question = questions[questionId]
    const option = question[optionName]
    const currentUser = users[authedUser]

    return {
        option,
        isVoted: option.votes.includes(authedUser),
        showResults: Object.keys(currentUser.answers).includes(questionId),
        percentage: ((option.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2),
        optionName
    }
}

export default connect(mapStateToProps)(Option)