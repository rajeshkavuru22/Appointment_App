import './index.css'

const AppointmentItem = props => {
  const {Item, Starred} = props
  const {id, title, date, isStarred} = Item

  const favourite = () => {
    Starred(id)
  }

  return (
    <li className="item-container">
      <div className="content-container">
        <p className="title">{title}</p>
        <button className="btn" type="button" onClick={favourite} testid="star">
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
            className="star"
          />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
