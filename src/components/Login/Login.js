import React, {Component} from 'react'
import {connect} from 'react-redux'
import {authenticateUser} from "../../actions/authedUser"
import {Redirect} from 'react-router-dom'
import './Login.css'

class Login extends Component {
    state = {
        username: '',
        isLoggedIn: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {username} = this.state
        const {dispatch} = this.props

        if (username !== "") {
            dispatch(authenticateUser(username))
            this.setState(() => ({isLoggedIn: true}))
        }
    }
    handleChange = (e) => {
        const username = e.target.value
        this.setState(() => ({username}))
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        const {isLoggedIn} = this.state

        if (isLoggedIn) {
            return <Redirect to={from}/>
        }

        return (
            <div id="login">
                <form onSubmit={this.handleSubmit} className="form-group">
                    <h2>Pick a user</h2>
                        <select id="username" className="form-control"
                                value={this.state.username}
                                onChange={this.handleChange}>
                            <option value='' disabled>Select</option>
                            {this.props.users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                )
                            )}
                        </select>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        )
    }
}
function mapStateToProps({users, authedUser}) {
    return {
        users: Object.values(users).map((user) => {
            return ({
                id: user.id,
                name: user.name
            })
        }),
        username: authedUser
    }
}

export default connect(mapStateToProps)(Login)