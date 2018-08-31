import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from "../utils/helpers";
import Nav from './Nav/Nav'


const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isAuthenticated ?
                (<div>
                    <Nav/>
                    <div>
                        <div>
                            <Component {...props}/>
                        </div>
                    </div>
                </div>)
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )
    }}/>
)

function mapStateToProps({authedUser}) {
    return {
        isAuthenticated: !isEmpty(authedUser)
    }
}

export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)