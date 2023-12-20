import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [customerGivenLocation, setCustomerGivenLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    price: false,
    distance: true,
    rating: false,
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // const fetchedRestaurants = [
        //   {
        //     id: 1,
        //     name: "Restaurant 1",
        //     description:
        //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.5,
        //     price: "8€",
        //     distance: "0.5 miles",
        //     image: require("../assets/HotDog.jpg"),
        //   },
        //   {
        //     id: 2,
        //     name: "Restaurant 2",
        //     description:
        //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.2,
        //     price: "7.50€",
        //     distance: "0.8 miles",
        //     image: require("../assets/Wendys.png"),
        //   },
        //   {
        //     id: 3,
        //     name: "Restaurant 3",
        //     description:
        //       "Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.9,
        //     price: "5.5€",
        //     distance: "1.5 miles",
        //     image: require("../assets/ribs.jpg"),
        //   },
        //   {
        //     id: 4,
        //     name: "Restaurant 4",
        //     description:
        //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 3.5,
        //     price: "9€",
        //     distance: "1.1 miles",
        //     image: require("../assets/sushimix.jpg"),
        //   },
        //   {
        //     id: 5,
        //     name: "Restaurant 5",
        //     description:
        //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.3,
        //     price: "13€",
        //     distance: "2.5 miles",
        //     image: require("../assets/PizzaHut.png"),
        //   },
        //   {
        //     id: 6,
        //     name: "Restaurant 6",
        //     description:
        //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.7,
        //     price: "11.50€",
        //     distance: "3 miles",
        //     image: require("../assets/Logo-KFC.png"),
        //   },
        //   {
        //     id: 7,
        //     name: "Restaurant 7",
        //     description:
        //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 3.3,
        //     price: "4€",
        //     distance: "1.7 miles",
        //     image: require("../assets/mcdo.jpg"),
        //   },
        //   {
        //     id: 8,
        //     name: "Restaurant 8",
        //     description:
        //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 4.1,
        //     price: "22€",
        //     distance: "1.8 miles",
        //     image: require("../assets/steak.jpg"),
        //   },
        //   {
        //     id: 9,
        //     name: "Restaurant 9",
        //     description:
        //       "Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
        //     qualification: 2.5,
        //     price: "17€",
        //     distance: "0.5 miles",
        //     image: require("../assets/DQ.png"),
        //   },
        //   {
        //     id: 10,
        //     name: "Restaurant 10",
        //     description:
        //       "Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.1",
        //     qualification: 4.9,
        //     price: "14€",
        //     distance: "4.5 miles",
        //     image: require("../assets/Wendys.png"),
        //   },
        // ];

        if (status === "granted") {
          // Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          //   console.log(location);
          setPermissionGranted(true);
          // setLocation({
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // });
          // setRestaurants(fetchedRestaurants);
          fetch(`https://plate-suggest-backend.vercel.app/places/${user.token}`)
            .then((res) => res.json())
            .then((data) => {
              setRestaurants(data.plats);
            });
          // });
        } else {
          setModalVisible(true);
          setRestaurants("No restaurants available");
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

  const handleSelection = (restaurant) => {
    setSelectedRestaurant(restaurant);
    navigation.navigate("Detail", { restaurant });
  };

  const pressFilterDropdown = () => {
    setFilterDropdownVisible(!filterDropdownVisible);
  };

  const applyFilters = () => {
    const filteredRestaurants = sortRestaurants(restaurants);
    setRestaurants(filteredRestaurants);
  };

  const renderRestaurant = ({ item }) => {
    const maxLengthDescription =
      item.dish_description.length > 120
        ? item.dish_description.substring(0, 120) + "..."
        : item.dish_description;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.restaurantContainer}
          onPress={() => handleSelection(item)}
        >
          <Image
            source={{ uri: item.dish_image }}
            style={styles.restaurantImage}
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.dish_name}</Text>
            <Text style={styles.restaurantDescription}>
              {maxLengthDescription}
            </Text>
            <Text style={styles.restaurantQualification}>
              Rating:{item.note}{" "}
            </Text>
            <Text style={styles.restaurantPrice}>Price: {item.price}</Text>
            <Text style={styles.restaurantDistance}>
              Distance:{item.distance} m
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };

  const sortRestaurants = (restaurants) => {
    return restaurants.sort((a, b) => {
      switch (true) {
        case selectedFilters.price:
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return sortOrder === "asc" ? priceA - priceB : priceB - priceA;

        case selectedFilters.distance:
          const distanceA = parseFloat(a.distance);
          const distanceB = parseFloat(b.distance);

          return sortOrder === "asc"
            ? distanceA - distanceB
            : distanceB - distanceA;

        case selectedFilters.rating:
          return sortOrder === "desc"
            ? a.qualification - b.qualification
            : b.qualification - a.qualification;

        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Salut, </Text>
          <Text style={styles.name}> {user.username}!</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={pressFilterDropdown}
          >
            <FontAwesome
              name="filter"
              size={25}
              color={
                selectedFilters.price ||
                selectedFilters.distance ||
                selectedFilters.rating
                  ? "#A41623"
                  : "gray"
              }
            />
          </TouchableOpacity>

          {/* Filter Dropdown */}
          {filterDropdownVisible && (
            <Modal
              isVisible={filterDropdownVisible}
              onBackdropPress={() => setFilterDropdownVisible(false)}
              style={{
                justifyContent: "flex-end",
                margin: 0,
              }}
            >
              <View style={styles.filterDropdown}>
                <View style={styles.divLogo}>
                  <Image
                    source={require("../assets/LogoPlateSuggest.png")}
                    style={styles.logoPlateSuggest}
                  />
                </View>
                <CheckBox
                  title="Prix"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedFilters.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedFilters({
                      price: !selectedFilters.price,
                      distance: false,
                      rating: false,
                    })
                  }
                />
                <CheckBox
                  title="Distance"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedFilters.distance}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedFilters({
                      price: false,
                      distance: !selectedFilters.distance,
                      rating: false,
                    })
                  }
                />
                <CheckBox
                  title="Avis"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedFilters.rating}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedFilters({
                      price: false,
                      distance: false,
                      rating: !selectedFilters.rating,
                    })
                  }
                />
              </View>
            </Modal>
          )}
        </View>
      </View>

      <View style={styles.restaurantContainer}>
        {permissionGranted && (
          <FlatList
            style={{ marginTop: 5 }}
            data={sortRestaurants(restaurants)}
            renderItem={renderRestaurant}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {!permissionGranted && (
          <FlatList
            style={{ marginTop: 5 }}
            data={restaurants.reverse()}
            renderItem={renderRestaurant}
            keyExtractor={(item, index) => index.toString()}
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
    // fontWeight: "bold",
    fontFamily: "SansitaBold",
  },
  name: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#A61423",
    fontFamily: "SansitaBold",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "white",
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "#A41623",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "SansitaBold",
  },
  restaurantContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    zIndex: -1,
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
    // fontWeight: "bold",
    fontFamily: "SansitaBold",
  },
  restaurantDescription: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Sansita",
  },
  restaurantQualification: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "SansitaBold",
  },
  restaurantPrice: {
    fontSize: 16,
    fontFamily: "SansitaBold",
  },
  restaurantDistance: {
    fontSize: 16,
    color: "gray",
    fontFamily: "SansitaBold",
  },
  filterDropdown: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "50%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    // position: "absolute",
    // right: 0,
    // width: 150,
    // height: 170,
    // top: 55,
  },
  CheckBox: {
    zIndex: 50,
    backgroundColor: "white",
    height: 40,
    fontSize: 18,
    margin: 30,
    fontFamily: "SansitaBold",
  },
  divLogo: {
    backgroundColor: "#A41623",
    height: 120,
    margin: 0,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  logoPlateSuggest: {
    height: 60,
    width: 200,
  },
});
