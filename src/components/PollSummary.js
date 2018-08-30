import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PollSummary extends Component {
    render() {
        const {question} = this.props
        console.log("question from Poll Summary", question);
        const {id, optionOne, optionTwo} = question

        return (
            <Link to={`/questions/${id}`}>
                <span>{optionOne.text} or {optionTwo.text}</span>
            </Link>
        )
    }

}

function mapStateToProps({questions}, {id}) {
    return {
        question: questions[id]
    }

}

export default connect(mapStateToProps)(PollSummary)