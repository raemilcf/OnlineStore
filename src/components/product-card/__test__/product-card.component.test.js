import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.componet";

describe("product card test ", () => {
    test('product card button add item when click', async () => {
        const mockProduct = {
            id:1, 
            name: "test",
            price: 20,
            imageUrl:"testImg"
        }
        const { store } = renderWithProviders(<ProductCard product={mockProduct} />,{
            preloadedState:{
                cart:{
                    cartItems:[]
                }
            }
        });

        const addTocart = screen.getByText(/add to cart/i);

        await fireEvent.click(addTocart);

        console.log(store.getState().cart.cartItems);
        expect(store.getState().cart.cartItems.length).toBe(1);
    });
});