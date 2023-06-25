import { selectCategories, selectCategoriesMap, selectCategoriesIsLoading } from '../categories.selector'

const mockData = {
    categories:{
        isLoading: false,
        categories: [
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
    ]
}
};


describe('category selector', () => {
    test('select categories', () => {
        const categoriesSlice = selectCategories(mockData);
        expect(categoriesSlice).toEqual(mockData.categories.categories);
    })

    test('is Loading', ()=> {
        const isLoading = selectCategoriesIsLoading(mockData);
        expect(isLoading).toEqual(false);

    })

    test('categories map', () => {
        const expected = {
            mens: [
                {id:1, name: 'product1'},
                {id:2, name: 'product2'},
            ],
            womens: [
                {id:3, name: 'product3'},
                {id:4, name: 'product4'},
            ]
        }

        const categoriesMap = selectCategoriesMap(mockData);
        expect(categoriesMap).toEqual(expected);
    })
})