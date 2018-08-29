import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import '../App.css';
import Dashboard from "./Dashboard";
import Login from './Login/Login'
import PrivateRoute from './common/PrivateRoute'
import NewQuestion from './NewQuestion'
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared"
import Leaderboard from "./Leaderboard/Leaderboard"
import Question from './Question/Question'
import {isEmpty} from "../utils/helpers";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/" exact component={Dashboard}/>
                            <PrivateRoute path="/leaderboard" component={Leaderboard}/>
                            <PrivateRoute path="/add" component={NewQuestion}/>
                            <PrivateRoute path="/questions/:question_id" component={Question}/>
                        </div>}
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({questions, users}) {
    return {
        loading: isEmpty(questions) || isEmpty(users)
    }
}

export default connect(mapStateToProps)(App);