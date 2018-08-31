import React, {Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import "./Nav.css";
import {Nav as BootstrapNavLink} from 'reactstrap'
import {signOut} from "../../actions/authedUser"


class Nav extends Component {
    state = {
        redirect: false
    }

    handleSignout = (e) => {
        e.preventDefault()
        this.props.dispatch(signOut())

        this.setState(() => ({
            redirect: true
        }))
    }

    render() {
        const {redirect} = this.state
        if (redirect === true) {
            return (<Redirect to="/login"/>)
        }

        return (
            <div className="container">
            <div className="navbar navbar-default">
                <div className="page-header">
                    <h2 className="text-center">Welcome {this.props.user.name}</h2>
                </div>
                <ul className="list-inline nav nav-pills">
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
                        <BootstrapNavLink className="nav_link" tag={NavLink} to="#" onClick={this.handleSignout}>Sign out</BootstrapNavLink>
                    </li>
                </ul>
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