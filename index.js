import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import * as Sentry from "@sentry/react-native";

import App from './App';
import { name as appName } from './app.json';
import createStore from '@store/createStore';

const { store, persistor } = createStore();

const MainApp = () => {
  useKeepAwake();

    if (!__DEV__) {
        Sentry.init({
            dsn:
                'https://437523adc34d48efa65180f5add9d014@o477461.ingest.sentry.io/5518383',
        });
    }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App store={store} />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
