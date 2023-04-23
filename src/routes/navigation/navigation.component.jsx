import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";


import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss"

//fragment render to nothing, dont want to render some element - avoid adding another div 
const Navigation = () => {

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrownLogo className="logo" />
            </Link>
            <div className="nav-links-container">
            {/* link anker tag to takes us to the actual page we want - create proper routing   */}
                <Link className="nav-link" to='/shop'> 
                    SHOP
                </Link>
                <Link className="nav-link" to='/shop'> 
                    CONTACT
                </Link>
                <Link className="nav-link" to='/shop'> 
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;