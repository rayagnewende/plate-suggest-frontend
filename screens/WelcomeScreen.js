import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import user from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function WelcomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerGivenLocation, setCustomerGivenLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
            setPermissionGranted(true);
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            fetch(`https://plate-suggest-backend.vercel.app/places/${user.token}`)
                 .then( res => res.json())
                 .then( data => {
                  setRestaurants(data.plats)
                 })
            // const fetchedRestaurants = [
            //   {
            //     id: 1,
            //     name: "Restaurant 1",
            //     description:
            //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.5,
            //     price: "$$$",
            //     distance: "0.5 miles",
            //     image: require("../assets/HotDog.jpg"),
            //   },
            //   {
            //     id: 2,
            //     name: "Restaurant 2",
            //     description:
            //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.2,
            //     price: "$$",
            //     distance: "0.8 miles",
            //     image: require("../assets/Wendys.png"),
            //   },
            //   {
            //     id: 3,
            //     name: "Restaurant 3",
            //     description:
            //       "Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.9,
            //     price: "$",
            //     distance: "1.5 miles",
            //     image: require("../assets/ribs.jpg"),
            //   },
            //   {
            //     id: 4,
            //     name: "Restaurant 4",
            //     description:
            //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 3.5,
            //     price: "$$",
            //     distance: "1.1 miles",
            //     image: require("../assets/sushimix.jpg"),
            //   },
            //   {
            //     id: 5,
            //     name: "Restaurant 5",
            //     description:
            //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.3,
            //     price: "$$$",
            //     distance: "2.5 miles",
            //     image: require("../assets/PizzaHut.png"),
            //   },
            //   {
            //     id: 6,
            //     name: "Restaurant 6",
            //     description:
            //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.7,
            //     price: "$$$",
            //     distance: "3 miles",
            //     image: require("../assets/Logo-KFC.png"),
            //   },
            //   {
            //     id: 7,
            //     name: "Restaurant 7",
            //     description:
            //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 3.3,
            //     price: "$",
            //     distance: "1.7 miles",
            //     image: require("../assets/mcdo.jpg"),
            //   },
            //   {
            //     id: 8,
            //     name: "Restaurant 8",
            //     description:
            //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 4.1,
            //     price: "$$$",
            //     distance: "1.8 miles",
            //     image: require("../assets/steak.jpg"),
            //   },
            //   {
            //     id: 9,
            //     name: "Restaurant 9",
            //     description:
            //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
            //     qualification: 2.5,
            //     price: "$$$",
            //     distance: "0.5 miles",
            //     image: require("../assets/DQ.png"),
            //   },
            //   {
            //     id: 10,
            //     name: "Restaurant 10",
            //     description:
            //       "Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.1",
            //     qualification: 4.9,
            //     price: "$$$",
            //     distance: "4.5 miles",
            //     image: require("../assets/Wendys.png"),
            //   },
            // ];
            // setRestaurants(fetchedRestaurants);
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

  const renderRestaurant = ({ item }) => {
    const maxLengthDescription =
      item.dish_description.length > 120
        ? item.dish_description.substring(0, 120) + "..."
        : item.dish_description;
    return (
      <KeyboardAvoidingView
        style={styles.restaurantContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image source={{uri:item.dish_image}} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{item.dish_name}</Text>
          <Text style={styles.restaurantDescription}>
            {maxLengthDescription}
          </Text>
          <Text style={styles.restaurantQualification}>
            Rating: 4.5
          </Text>
          <Text style={styles.restaurantPrice}>Price: {item.price}</Text>
          <Text style={styles.restaurantDistance}>
            Distance: 300 m
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user.username}!</Text>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome name="filter" size={20} color="#A41623" />
        </TouchableOpacity>
      </View>
      <View style={styles.restaurantContainer}>
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
            style={{ marginTop: 5 }}
            data={restaurants}
            renderItem={renderRestaurant}
            keyExtractor={(index) => index}
          />
        )}
        {!permissionGranted && (
          <FlatList
            style={{ marginTop: 5 }}
            data={restaurants.reverse()}
            renderItem={renderRestaurant}
            keyExtractor={(index) => index}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#A41623",
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
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
    width: 130,
    height: "100%",
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
