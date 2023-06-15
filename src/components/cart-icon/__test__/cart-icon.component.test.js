import { screen } from '@testing-library/react'
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe('Cart icon test', () => {

    test('preload state to render', () => {
        const initialCartItems = [
            {id: 1, name: 'item A', imageUrl: 'test', price : 14, quantity: 1},
            {id: 2, name: 'item A', imageUrl: 'test', price : 14, quantity: 1},
            {id: 3, name: 'item A', imageUrl: 'test', price : 14, quantity: 1},

        ];

        renderWithProviders(<CartIcon/>, {
            preloadedState: {
                cart:{
                    cartItems: initialCartItems
                },
            },
        });
        //esperamos encontrar el id 1 en la lista de items 
        const cartIconElement = screen.getByText('3');
        expect(cartIconElement).toBeInTheDocument();
    })
})