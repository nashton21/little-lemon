import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import Filters from '../components/Filters';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import { useUpdateEffect, getFlatListData } from '../utils';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const Item = ({ name, price, description, image, category }) => (
  <View style={styles.menuItemContainer}>
    <View style={styles.menuTextContainer}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDesc}>{description}</Text>
      <Text style={styles.itemPrice}>${price}</Text>
    </View>
    <Image
      style={styles.itemImage}
      source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,}}
      resizeMode="contain"
      accessible={true}
      accessibilityLabel={'Avatar Image'}
    />
  </View>
);

export default function ProfileScreen ({ navigation }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        
        let menuItems = await getMenuItems();
        
        if (!menuItems.length) {
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu.map((item) => ({
            ...item,
          }));
          saveMenuItems(menuItems);
        }
        
        console.log("MenuItems");
        console.log(menuItems);
        console.log("");

        const flatListData = getFlatListData(menuItems);

        console.log("after get FlatListData");
        console.log(flatListData);
        console.log("");

        setData(flatListData);
        setFilterData(flatListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      let activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        console.log("Data")
        console.log({data});
        console.log("");
        activeCategories = activeCategories.map(v => v.toLowerCase());

        let newData = [];
        
        for (let i = 0; i < {data}.data.length; i++) {
          let allowedDish = false;
          let currentDish = {data}.data[i];

          for (let j = 0; j < activeCategories.length; j++) {
            if (currentDish.category == activeCategories[j]) {
              allowedDish = true;
            }
          }

          if (allowedDish) {
            if (currentDish.name.includes(query)) {
              newData.push({"category": currentDish.category, "description": currentDish.description, "image": currentDish.image, "name": currentDish.name, "price": currentDish.price});
            }
          }
        }

        setFilterData(newData);

      } catch (e) {
        Alert.alert(e.message);
      }
    })();


  }, [filterSelections, query]);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.littleLemonIcon}
          source={require('../assets/Logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Image'}
       />
       <Pressable onPress = {() => {
            navigation.navigate("Profile")
          }}>
          <Image
            style={styles.avatarImage}
            source={require('../assets/defaultavatar.png')}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={'Avatar Image'}
          />
        </Pressable>
      </View>
      <View style = {styles.centerSection}>
        <View style = {styles.centerSectionOrdering}>
          <View style = {styles.textCenterSection}>
            <Text style={styles.heroMenuHeader}>Little Lemon</Text>
            <Text style={styles.heroChicago}>Chicago</Text>
            <Text style={styles.heroText}>We are a family owned</Text>
            <Text style={styles.heroText}>Mediterranean restaurant,</Text>
            <Text style={styles.heroText}>focused on traditional</Text>
            <Text style={styles.heroText}>recipes served with a</Text>
            <Text style={styles.heroText}>modern twist.</Text>
          </View>
          <Image
            style={styles.heroImage}
            source={require('../assets/heroimage.png')}
            resizeMode="cover"
            accessible={true}
            accessibilityLabel={'Rolls Image'}
          />
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="white"
          inputStyle={{ color: 'white' }}
          elevation={0}
      />
      </View>
      <Text style = {styles.orderForDelivery}>ORDER FOR DELIVERY!</Text>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />

      <FlatList
        data={filterData}
        renderItem={({item}) => <Item name={item.name} price={item.price} description={item.description} image={item.image} category={item.category}/>}
        keyExtractor={item => item.name}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 30,
    marginTop: 10,
  },
  littleLemonIcon: {
    height: 60,
    marginLeft: 100,
    marginTop: 10,
  },
  centerSectionOrdering: {
    flexDirection:'row',
  },
  heroText: {
    numberOfLines: 5,
  },
  textCenterSection: {
    flexDirection: 'column',
  },
  heroImage: {
    marginTop: 10,
    marginLeft: 10,
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  categoryButtonContainer: {
    flexDirection:'row',
  },
  centerSection: {
    backgroundColor: '#495E57',
  },
  heroText: {
    marginLeft: 10,
    color: "white",
    fontSize: 14,
  },
  heroChicago: {
    marginLeft: 10,
    color: "white",
    fontSize: 20,
  },
  heroMenuHeader: {
    marginLeft: 10,
    color: "#F4CE14",
    fontSize: 24,
  },
  orderForDelivery: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  itemName: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 10,
    color: 'black',
  },
  itemPrice: {
    fontSize: 10,
    color: 'darkgrey',
    fontWeight: 'bold',
  },
  menuItemContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  menuTextContainer: {
    width: 280,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginLeft: 30,
  },
});
