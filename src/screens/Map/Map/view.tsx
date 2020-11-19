import React, {useState} from 'react';
import {Image, View} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '@constants/colors';
import Icon from '@assets/icons';
import styles from "./styles";
import images from "@assets/images";
import API_KEY from "@constants/apiKey";


interface IProps {
    getCurrentLocation: () => void;
    setDestinationDetails: (payload: any) => void;
    onUserLocationChange: (payload: any) => void;
    routeCoordinates: any;
    setMapRef: (ref: any) => void;
    currentLocation: any;
    mapRef: any;
    route: any;
    distanceTravelled: number;
}

let Map = (
    {
        getCurrentLocation,
        setMapRef,
        currentLocation,
        onUserLocationChange,
    }: IProps) => {
    const [ways, setWays] = useState([]);

    return (
        <View style={styles.container}>
            <MapView
                followsUserLocation
                showsUserLocation
                onUserLocationChange={(event) => {
                    onUserLocationChange(event.nativeEvent.coordinate)
                }}
                ref={ref => setMapRef(ref)}
                style={styles.map}
                showsBuildings
                loadingEnabled
                loadingIndicatorColor={colors.green}
                provider={PROVIDER_GOOGLE}
            >
                <Marker coordinate={currentLocation} style={{top: -20}}>
                    <Image style={styles.marker} source={images.car}/>
                </Marker>
                <Polyline
                    coordinates={ways}
                    strokeColor={colors.blue}
                    strokeWidth={6}
                />
            </MapView>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={getCurrentLocation}>
                    <View style={styles.currentLocationMarker}>
                        <Icon name="location" size={20} color={colors.blue}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Map;
