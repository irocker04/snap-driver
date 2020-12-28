import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import AppNavigator from './src/navigation/AppNavigator';
// @ts-ignore
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import api from './src/services/api';
import { formData } from '@store/utils';
import map from '@store/actions/map';
import user from '@store/actions/user';
import { connect } from 'react-redux';

const requestPermission = async () => {
  try {
    let hasPermission;
    if (Platform.OS === 'android') {
      hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!hasPermission) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    }
  } catch (e) {}
};

const App = ({ UpdateLocation, GetCurrentLocation, store }) => {
  const [watchId, setWatchId] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (data) => {
        GetCurrentLocation(data.coords);
        UpdateLocation(
          formData({
            lng: data.coords.longitude,
            lat: data.coords.latitude,
          }),
        );
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  useEffect(() => {
    api.setToken(store);
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {})
      .catch((err) => {});

    requestPermission().then(() => {
      setTimeout(() => {
        getCurrentLocation();
        if (watchId === null) {
          setWatchId(0);
          Geolocation.watchPosition(
            (position) => {
              GetCurrentLocation(position.coords);
              UpdateLocation(
                formData({
                  lng: position.coords.longitude,
                  lat: position.coords.latitude,
                }),
              );
            },
            () => {},
            { enableHighAccuracy: true },
          );
        }
      }, 0);
    });
  }, []);

  return <AppNavigator />;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      UpdateLocation: user.UpdateLocation,
      GetCurrentLocation: map.GetCurrentLocation,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(App);
