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
        whitelist: ['user','booking' ],
    };

    const sagaMonitor = ReactotronConfig.createSagaMonitor();
    const sagaMiddleware = createSagaMiddleware({sagaMonitor});
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    let store;

    store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(sagaMiddleware),
            ReactotronConfig.createEnhancer(),
        ),
    );

    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);

    return {store, persistor};
};
