import { screen } from "@testing-library/react";
import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //get everything in the dom
    useParams: () => ({

        category: 'mens',
    })
}));

describe('Category test', () => {
    test('spinner', () => {
        renderWithProviders(<Category/>,{
            preloadedState:{
                categories:{
                    isLoading:true,
                    categories:[]
                }
            }
        });
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();

    });

    test('render no spinner', () => {
        renderWithProviders(<Category/>,{
            preloadedState:{
                categories:{
                    isLoading: false,
                    categories:[
                        {
                            title:'mens',
                            items: [
                                {id:1, name: 'product1'},
                                {id:2, name: 'product2'},

                            ]
                        }
                    ]
                }
            }
        });
        const spinner = screen.queryByTestId('spinner');

        expect(spinner).toBeNull();

        const product = screen.getByText(/product1/i);
        expect(product).toBeInTheDocument();
    })
})