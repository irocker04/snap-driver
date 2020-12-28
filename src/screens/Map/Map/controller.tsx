import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import Map from './view';
import IAction from '@store/types/IAction';
import { formData } from '@store/utils';

interface IProps {
  GetCurrentLocation: IAction;
  SetDestinationDetails: IAction;
  UpdateLocation: IAction;
  currentLocation: any;
  newOrder: any;
}

const MapController = ({
  GetCurrentLocation,
  SetDestinationDetails,
  currentLocation,
  UpdateLocation,
  newOrder,
}: IProps) => {
  const [mapRef, setMapRef] = useState(null);
  const [route, setRoute] = useState({});

  useEffect(() => {
    if ((newOrder.status === 'new' || newOrder.status === 'accepted') && currentLocation.longitude) {
      const routes = newOrder.routes;
      setRoute({
        from: {
          longitude: +currentLocation.longitude,
          latitude: +currentLocation.latitude,
        },
        to: {
          longitude: +routes[0].lng,
          latitude: +routes[0].lat,
        },
      });
    }
  }, [newOrder.status]);


  useEffect(() => {
    if (mapRef) {
      // @ts-ignore
      mapRef.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      });
    }
  }, [currentLocation]);

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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };


  return (
    <Map
      getCurrentLocation={getCurrentLocation}
      setDestinationDetails={SetDestinationDetails}
      setMapRef={setMapRef}
      currentLocation={currentLocation}
      mapRef={mapRef}
      route={route}
      newOrder={newOrder}
    />
  );
};
export default MapController;
