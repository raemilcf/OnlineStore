import { expectSaga, testSaga } from "redux-saga-test-plan";
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga} from '../categories.saga';
import { call } from 'typed-redux-saga';
import { CATEGORIES_ACTION_TYPES } from "../categories.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSucces } from "../categories.action";
import { throwError } from "redux-saga-test-plan/providers";
//redux saga test plan

//test are secuential, if something is no test in order it will break 

describe('categories saga', () => {

    test('categories saga', () => {
        //we use test saga library, to test our saga implementation
        testSaga(categoriesSaga)
        .next()
        .all([call(onFetchCategories)])
        .next()
        .isDone();
    });

    test('on fetch', () => {

        testSaga(onFetchCategories)
        .next()
        .takeLatest(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
        )
        .next()
        .isDone();
    });


    test('fetch async success', () =>{

        const mockCategory = [
            {id: 1, name: 'Category 1'},
            {id: 2, name: 'Category 2'},

        ]
        //they will happen at some point, and will give a mock
        return expectSaga(fetchCategoriesAsync)
        .provide([
            //effect, result -> give and expect to receive
            [call(getCategoriesAndDocuments), mockCategory]
        ])
        .put(fetchCategoriesSucces(mockCategory))
        .run();

    })

    test('fetch async failed', () =>{


        const mockErro = new Error("error");
        return expectSaga(fetchCategoriesAsync)
        .provide([[call(getCategoriesAndDocuments), throwError(mockErro)]])
        .put(fetchCategoriesFailed(mockErro))
        .run();

        
    })
})