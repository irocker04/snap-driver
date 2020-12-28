import storage from '@react-native-community/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import ReactotronConfig from './ReactotronConfig';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default (initialState = {}) => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['user', 'booking', 'regions'],
    };

    let sagaMiddleware, store;

    if (__DEV__) {
        const sagaMonitor = ReactotronConfig.createSagaMonitor();
        sagaMiddleware = createSagaMiddleware({sagaMonitor});
        const persistedReducer = persistReducer(persistConfig, rootReducer);


        store = createStore(
            persistedReducer,
            compose(applyMiddleware(sagaMiddleware), ReactotronConfig.createEnhancer())
        );
    } else {
        sagaMiddleware = createSagaMiddleware();
        const persistedReducer = persistReducer(persistConfig, rootReducer);

        store = createStore(
            persistedReducer,
            compose(applyMiddleware(sagaMiddleware))
        );
    }


    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);

    return {store, persistor};
};
