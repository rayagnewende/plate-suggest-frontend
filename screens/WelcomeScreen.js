import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  useEffect,
} from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

export default function WelcomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerGivenLocation, setCustomerGivenLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
            console.log(location);
            setPermissionGranted(true);
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            const fetchedRestaurants = [
              {
                id: 1,
                name: "Restaurant 1",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.5,
                price: "$$$",
                distance: "0.5 miles",
                image: require("../assets/HotDog.jpg"), // Replace with actual image source
              },
              {
                id: 2,
                name: "Restaurant 2",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.2,
                price: "$$",
                distance: "0.8 miles",
                image: require("../assets/burger.jpg "), // Replace with actual image source
              },
              {
                id: 3,
                name: "Restaurant 3",
                description:
                  "Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.9,
                price: "$",
                distance: "1.5 miles",
                image: require("../assets/ribs.jpg"), // Replace with actual image source
              },
              {
                id: 4,
                name: "Restaurant 4",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 3.5,
                price: "$$",
                distance: "1.1 miles",
                image: require("../assets/sushimix.jpg"), // Replace with actual image source
              },
              {
                id: 5,
                name: "Restaurant 5",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.3,
                price: "$$$",
                distance: "2.5 miles",
                image: require("../assets/poisson.jpg"), // Replace with actual image source
              },
              {
                id: 6,
                name: "Restaurant 6",
                description:
                  "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.7,
                price: "$$$",
                distance: "3 miles",
                image: require("../assets/indien.jpg"), // Replace with actual image source
              },
              {
                id: 7,
                name: "Restaurant 7",
                description:
                  "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 3.3,
                price: "$",
                distance: "1.7 miles",
                image: require("../assets/mcdo.jpg"), // Replace with actual image source
              },
              {
                id: 8,
                name: "Restaurant 8",
                description:
                  "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 4.1,
                price: "$$$",
                distance: "1.8 miles",
                image: require("../assets/steak.jpg"), // Replace with actual image source
              },
              {
                id: 9,
                name: "Restaurant 9",
                description:
                  "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
                qualification: 2.5,
                price: "$$$",
                distance: "0.5 miles",
                image: require("../assets/DQ.png"), // Replace with actual image source
              },
              {
                id: 10,
                name: "Restaurant 10",
                description:
                  "Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.1",
                qualification: 4.9,
                price: "$$$",
                distance: "4.5 miles",
                image: require("../assets/Wendys.png"), // Replace with actual image source
              },
              // Add more restaurants...
            ];
            setRestaurants(fetchedRestaurants);
          });
        } else {
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Error obtaining location permission:", error);
        Alert.alert(
          "Error",
          "There was an issue obtaining location permission. Please try again."
        );
      }
    })();
  }, []);

  // const saveCustomerLocation =(location) => {

  // }

  const renderRestaurant = ({ item }) => (
    <View style={styles.restaurantContainer}>
      <Image source={item.image} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDescription}>{item.description}</Text>
        <Text style={styles.restaurantQualification}>
          Rating: {item.qualification}
        </Text>
        <Text style={styles.restaurantPrice}>Price: {item.price}</Text>
        <Text style={styles.restaurantDistance}>Distance: {item.distance}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter your address location"
              onChangeText={(value) => setCustomerGivenLocation(value)}
              value={customerGivenLocation}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => {
                // saveCustomerLocation(customerGivenLocation);
                setModalVisible(false);
              }}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {permissionGranted && (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {!permissionGranted && (
        <FlatList
          data={restaurants.reverse()}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Text style={styles.text}>Welcome Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  restaurantContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  restaurantImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantDescription: {
    fontSize: 14,
    color: "gray",
  },
  restaurantQualification: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantPrice: {
    fontSize: 16,
  },
  restaurantDistance: {
    fontSize: 16,
    color: "gray",
  },
});
