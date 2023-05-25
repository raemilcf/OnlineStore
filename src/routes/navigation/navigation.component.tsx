import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles";
import { signOutStart } from "../../store/user/user.action";


//fragment render to nothing, dont want to render some element - avoid adding another div 
const Navigation = () => {

    const dispatch = useDispatch();

    //allows to take a specific part of redux and get the values 
    const currentUser = useSelector(selectCurrentUser);
    const  isCartOpen  = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch( signOutStart());
 
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
                    <NavLink as='span'  onClick={signOutUser}> Sign Out</NavLink>
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