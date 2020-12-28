import React from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import colors from '@constants/colors';
import Icon from '@assets/icons';
import styles from './styles';
import images from '@assets/images';
import API_KEY from '@constants/apiKey';

interface IProps {
  getCurrentLocation: (coords: any) => void;
  setDestinationDetails: (payload: any) => void;
  setMapRef: (ref: any) => void;
  currentLocation: any;
  mapRef: any;
  route: any;
  newOrder: any;
}

let Map = ({
  getCurrentLocation,
  setMapRef,
  currentLocation,
  setDestinationDetails,
  newOrder,
  route,
  mapRef,
}: IProps) => {
  return (
    <View style={styles.container}>
      {currentLocation.longitude && (
        <MapView
          ref={(ref) => setMapRef(ref)}
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          }}
          showsBuildings
          provider={PROVIDER_GOOGLE}>
          <Marker
            coordinate={currentLocation}
            style={{
              transform: [{ rotate: `${currentLocation.heading + 100 | 0} deg` }],
            }}>
              <Image style={styles.marker} source={images.car} />
          </Marker>
          {(newOrder.status === 'accepted' || newOrder.status === 'new') && currentLocation.longitude && (
            <MapViewDirections
              origin={route.from}
              mode={'DRIVING'}
              destination={route.to}
              apikey={API_KEY}
              strokeWidth={6}
              strokeColor={colors.blue}
              onReady={(direction) => {
                setDestinationDetails({
                  coordinates: direction.coordinates,
                  distance: direction.distance.toFixed(2),
                  duration: direction.duration,
                });
                if (newOrder.status === 'accepted') {
                  mapRef.fitToCoordinates([route.from, route.to], {
                    edgePadding: {
                      top: 20,
                      right: 20,
                      bottom: 50,
                      left: 20,
                    },
                  });
                }
              }}
            />
          )}
        </MapView>
      )}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={getCurrentLocation}>
          <View style={styles.currentLocationMarker}>
            <Icon name="location" size={20} color={colors.blue} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;
