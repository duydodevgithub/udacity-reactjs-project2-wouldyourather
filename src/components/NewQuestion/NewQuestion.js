import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import "./NewQuestion.css";
import {handleAddQuestion} from "../../actions/questions"

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toDashboard: false
    }

    handleChange = (e) => {
        const {value, id} = e.target
        this.setState(() => ({[id]: value}))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {dispatch} = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toDashboard: true
        }))
    }

    render() {
        const {toDashboard} = this.state;

        if (toDashboard === true) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container">
            <div className="jumbotron">
                <h5 className="text-center">Would You Rather...?</h5>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" placeholder="Option 1" id="optionOne" onChange={this.handleChange}/>
                        <span>   or   </span>
                        <input type="text" id="optionTwo" placeholder="Option two" onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-block btn-primary">Add Question</button>
                </form>
            </div>
            </div>
        )
    }
}

export default connect()(NewQuestion)