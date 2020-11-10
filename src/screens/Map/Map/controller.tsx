import React, {useEffect, useState} from 'react';
import { StatusBar, Platform, PermissionsAndroid} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import haversine from 'haversine';
import Map from "./view";
import {colors} from "@constants/index";
import IAction from "@store/types/IAction";

interface IProps {
    GetCurrentLocation: IAction;
    SetDestinationDetails: IAction;
    currentLocation: any;
    newOrder: any;
}

const MapController = (
    {
        GetCurrentLocation,
        SetDestinationDetails,
        currentLocation,
        newOrder,
    }: IProps) => {
    const [mapRef, setMapRef] = useState(null);
    const [route, setRoute] = useState({});
    const [prevCoordinates, setPrevCoordinates] = useState({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
    });


    useEffect(() => {
        if (Object.keys(newOrder).length > 0) {
            if (newOrder.status === 'accepted') {
                setRoute({
                    from: {
                        longitude: Number(currentLocation.longitude),
                        latitude: Number(currentLocation.latitude)
                    },
                    to: {
                        longitude: Number(newOrder.routes[0].lng),
                        latitude: Number(newOrder.routes[0].lat)
                    }
                })
            } else if (newOrder.routes[1]) {
                setRoute({
                    from: {
                        longitude: Number(newOrder.routes[0].lng),
                        latitude: Number(newOrder.routes[0].lat)
                    },
                    to: {
                        longitude: Number(newOrder.routes[1].lng),
                        latitude: Number(newOrder.routes[1].lat)
                    }
                })
            }
        } else {
            setRoute({})
        }
    }, [newOrder.status]);

    useEffect(() => {
        if (mapRef) {
            // @ts-ignore
            mapRef.animateToRegion({
                ...currentLocation,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
            })
        }
    }, [currentLocation]);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(colors.white);

        // noinspection JSIgnoredPromiseFromCall
        requestPermission();

        getCurrentLocation()

    }, []);


    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition((data) => {
            GetCurrentLocation(data.coords);
            setPrevCoordinates({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            })
        }, error => {
            console.log(error);
            // getCurrentLocation()
        })
    };

    const requestPermission = async () => {
        let hasPermission;
        if (Platform.OS === 'android') {
            hasPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (!hasPermission) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
            }
        }
    };



    const onUserLocationChange = (coordinates: any) => {
        GetCurrentLocation(coordinates)
    };


    return (
        <Map
            getCurrentLocation={getCurrentLocation}
            setDestinationDetails={SetDestinationDetails}
            setMapRef={setMapRef}
            currentLocation={currentLocation}
            mapRef={mapRef}
            route={route}
            onUserLocationChange={onUserLocationChange}
        />
    );
};

export default MapController;
