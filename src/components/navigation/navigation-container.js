import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useHistory } from "react-router-dom";

const NavigationComponent = (props) =>{
  const dynamicLink = (route, linkText) => {
    return (
      <div className='nav-link-wrapper'>
        <NavLink exact to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    )
  }
  const history = useHistory();

  const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
      if (response.status === 200) {
        history.push("/")
        props.handleSuccesfulLogout()
      }
      return response.data
    }).catch(error => {
      console.log('Error signing out', error)
    })
  }
  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className='nav-link-wrapper'>
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink exact to="/about-me" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink exact to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>

        <div className='nav-link-wrapper'>
          <NavLink exact to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div>

        {props.loggedInStatus === "LOGGED_IN" ? (
          dynamicLink('/portfolio-manager', 'Portfolio Manager')
        ) : null}
      </div>

      <div className="right-side">
        PAIGE LOVE

        {props.loggedInStatus === "LOGGED_IN" ? (<a onClick={handleSignOut}><FontAwesomeIcon icon="sign-out-alt" /></a>) : null}
      </div>
    </div>
  );
}

export default NavigationComponent;