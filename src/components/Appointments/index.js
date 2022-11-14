import {Component} from 'react'

import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    inputTitle: '',
    inputDate: '',
    appointmentsList: [],
    clickStarred: false,
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate, appointmentsList} = this.state
    if (inputDate !== '' && inputTitle !== '') {
      const formatedDate = format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      console.log(formatedDate)
      const newAppointment = {
        id: uuidv4(),
        title: inputTitle,
        date: formatedDate,
        isStarred: false,
      }
      const addedList = [...appointmentsList, newAppointment]
      this.setState({
        appointmentsList: addedList,
        inputTitle: '',
        inputDate: '',
      })
    }
  }

  Starred = id => {
    const {appointmentsList} = this.state
    const resultantList = appointmentsList.map(each => {
      if (each.id === id) {
        return {...each, isStarred: !each.isStarred}
      }
      return each
    })
    this.setState({appointmentsList: resultantList})
  }

  getStarred = () => {
    this.setState(prevState => ({clickStarred: !prevState.clickStarred}))
  }

  render() {
    const {appointmentsList, clickStarred} = this.state
    let filteredList
    if (clickStarred) {
      filteredList = appointmentsList.filter(each => each.isStarred === true)
    } else {
      filteredList = appointmentsList
    }

    return (
      <div className="bg-container">
        <div className="body-container">
          <div className="top-container">
            <div className="middle-container">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <div className="input-container">
                  <label htmlFor="Title" className="label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="Title"
                    placeholder="Title"
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="Date" className="label">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="input"
                    id="Date"
                    onChange={this.onChangeDate}
                  />
                </div>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="hr-line" />
          <div className="bottom-container">
            <div className="head-container">
              <h1 className="heading">Appointments</h1>
              {clickStarred ? (
                <button
                  type="button"
                  className="unstar starred"
                  onClick={this.getStarred}
                >
                  Starred
                </button>
              ) : (
                <button
                  type="button"
                  className="unstar"
                  onClick={this.getStarred}
                >
                  Starred
                </button>
              )}
            </div>
            <ul className="list-container">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  Item={eachAppointment}
                  key={eachAppointment.id}
                  Starred={this.Starred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
