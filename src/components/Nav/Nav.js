import React, {Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import "./Nav.css";
import {Nav as BootstrapNavLink} from 'reactstrap'
import {signOut} from "../../actions/authedUser"

class Nav extends Component {
    state = {
        redirect_Login: false
    }

    handleSignout = (e) => {
        e.preventDefault()
        this.props.dispatch(signOut())

        this.setState(() => ({
            redirect_Login: true
        }))
    }

    render() {
        const {user} = this.props
        // console.log(user);
        const {redirect_Login} = this.state
        if (redirect_Login === true) {
            return (<Redirect to="/login"/>)
        }

        return (
            <div>
                <div>
                    <div>
                    <ul class="nav nav-pills">
                        <li role="presentation">
                            <BootstrapNavLink className="nav_link" tag={NavLink} to="/">Dashboard</BootstrapNavLink>
                        </li>
                        <li role="presentation">
                            <BootstrapNavLink className="nav_link" tag={NavLink} to="/leaderboard">Leaderboard</BootstrapNavLink>                     
                        </li>
                        <li role="presentation">
                            <BootstrapNavLink className="nav_link" tag={NavLink} to="/add">Add New Question</BootstrapNavLink>
                        </li>
                        <li role="presentation">
                            <BootstrapNavLink className="nav_link" tag={NavLink} to="#" onClick={this.handleSignout}>Signout</BootstrapNavLink>
                        </li>
                    </ul>
                            <h3>Hi {user.name},</h3>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav)