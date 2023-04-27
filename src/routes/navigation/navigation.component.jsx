import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { singOutUser } from '../../utils/firebase/firebase.utils'
import { CartContext } from "../../context/cart.context";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
//fragment render to nothing, dont want to render some element - avoid adding another div 
const Navigation = () => {
    //re-render to show user changes on login
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

 
    return (
       
    <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrownLogo className="logo" />
            </LogoContainer>
            <NavLinks>
            {/* link anker tag to takes us to the actual page we want - create proper routing   */}
                <NavLink to='/shop'> 
                    SHOP
                </NavLink>
                <NavLink to='/shop'> 
                    CONTACT
                </NavLink>
                {currentUser ? (
                    <NavLink as='span'  onClick={singOutUser}> Sign Out</NavLink>
                ) : (
                    <NavLink to='/auth'> 
                        SIGN IN
                    </NavLink>
                )}
                <CartIcon />
            </NavLinks>
            {/* show or hide dropdown cart  */}
            { isCartOpen && ( <CartDropdown /> )}
        </NavigationContainer>
        <Outlet />
    </Fragment>
    );
}

export default Navigation;