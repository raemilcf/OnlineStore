import { screen } from '@testing-library/react'
import { kStringMaxLength } from 'buffer'
import { getAllJSDocTags } from 'typescript'
import { renderWithProviders } from "../../../utils/test/test.utils"
import Navigation  from '../navigation.component'

describe('Navigation test', () => {
    test('render a sign in link', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

        const signOutLinkElement = screen.queryByText(/sign out/i);
        expect(signOutLinkElement).toBeNull();
    })

    test('render a sign out link', () => {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })

        //get by test if dont exist will throw a error 
        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        //test something do not exist, it will return null
        const signInLinkElement = screen.queryByText(/sign in/i);
        expect(signInLinkElement).toBeNull();

    })

    test('render cart dropdown',() =>  {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                cart: {
                    cartItems: [],
                    isCartOpen: false
                }
            }
        })

        const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeNull();

    })

    test('render cart dropdown open',() =>  {
        renderWithProviders(<Navigation/>, {
            preloadedState: {
                cart: {
                    cartItems: [],
                    isCartOpen: true
                }
            }
        })

        const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeInTheDocument();

    })
})
