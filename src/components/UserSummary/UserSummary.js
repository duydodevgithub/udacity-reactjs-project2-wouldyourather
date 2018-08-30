import React, {Component} from 'react'
import {connect} from 'react-redux'
import './UserSummary.css'

class UserSummary extends Component {
    render() {
        const {user} = this.props
        console.log("user in User Summary: ", user);
        // display number of ask question
        const ask_num = user.questions.length;

        // display number of answer question
        const answer_num = Object.keys(user.answers).length;

        return (
            <tr>
                <td>{user.name}</td>
                <td><img src={user.avatarURL} alt="profile_picture" /></td>
                <td>Asked:{ask_num}</td>
                <td>Answered:{answer_num}</td>
            </tr>
        )
    }
}
function mapStateToProps({users}, {id}) {
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserSummary)