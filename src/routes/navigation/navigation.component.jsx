import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { singOutUser } from '../../utils/firebase/firebase.utils'


import "./navigation.styles.scss"
import { CartContext } from "../../context/cart.context";

//fragment render to nothing, dont want to render some element - avoid adding another div 
const Navigation = () => {
    //re-render to show user changes on login
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

 
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
                {currentUser ? (
                    <span className="nav-link" onClick={singOutUser}> Sign Out</span>
                ) : (
                    <Link className="nav-link" to='/auth'> 
                        SIGN IN
                    </Link>
                )}
                <CartIcon />
            </div>
            {/* show or hide dropdown cart  */}
            { isCartOpen && ( <CartDropdown /> )}
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;