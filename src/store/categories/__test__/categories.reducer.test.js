import { categoriesReducer, CATEGORIES_INITIAL_STATE } from "../categories.reducer";
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSucces } from "../categories.action";

describe('caregories reducer', () => {
    test('fetchCategoriesStart', () => {
        const expectedState ={
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true
        };

        expect( categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart()))
        .toEqual(expectedState);
    });

    test('success', () =>{

        const mockData = [
            {
                title:'mens',
                imageUrl: 'test',
                items: [
                    {id:1, name: 'product1'},
                    {id:2, name: 'product2'},

                ]
            },
            {
                title:'womens',
                imageUrl: 'test',
                items: [
                    {id:3, name: 'product3'},
                    {id:4, name: 'product4'},

                ]
            }
        ];
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData,
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSucces(mockData)))
        .toEqual(expectedState);

        
    });

    test('failed', () => {
        const mockError = new Error('Error fetching categories');

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error : mockError
        };

        expect(
            categoriesReducer(
                CATEGORIES_INITIAL_STATE,
                fetchCategoriesFailed(mockError)
            )
        ).toEqual(expectedState);
    })
})