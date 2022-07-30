import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickWebsiteLogo = () => {
    history.replace('/')
  }

  return (
    <div className="header-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
          onClick={onClickWebsiteLogo}
        />
      </Link>
      <ul className="mobile-view-container">
        <li className="header-list">
          <Link to="/" className="nav-link">
            <AiFillHome className="mobile-nav-icons" />
          </Link>
        </li>
        <li className="header-list">
          <Link to="/jobs" className="nav-link">
            <BsBriefcaseFill className="mobile-nav-icons" />
          </Link>
        </li>
        <li className="header-list">
          <button
            type="button"
            className="mobile-logout-button"
            onClick={onClickLogout}
          >
            <FiLogOut className="mobile-nav-icons" />
          </button>
        </li>
      </ul>
      <div className="desktop-view-container">
        <Link to="/" className="nav-link">
          <p className="nav-items">Home</p>
        </Link>
        <Link to="/jobs" className="nav-link">
          <p className="nav-items">Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        className="desktop-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
