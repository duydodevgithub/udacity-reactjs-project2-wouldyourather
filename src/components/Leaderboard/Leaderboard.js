import React, {Component} from 'react'
import {connect} from 'react-redux'
import "./Leatherboard.css";
import UserSummary from '../UserSummary/UserSummary'

class Leaderboard extends Component {
    render() {
        const {users} = this.props;
        console.log(users);
        return (
            <div className="container">
            <div class="panel panel-default">
                <div class="panel-heading">Leader Board </div>
                {/* generate top user */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Profile Picture</th>
                            <th>Question Asked</th>
                            <th>Question Answered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((userId) =>
                            <UserSummary key={userId} id={userId}/>
                        )}
                    </tbody>
                    
                </table>
            </div>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.keys(users)
            .sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    }
}

export default connect(mapStateToProps)(Leaderboard)