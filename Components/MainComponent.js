import React,{Component} from "react";
import Home  from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {Platform, View} from "react-native";
import {createDrawerNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation"
import Contactus from "./Contactus";
import Aboutus from "./Aboutus";

const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu},
    DishDetails: {screen :DishDetail}
},
    {
        initialRouteName: 'Menu',
        navigationOptions:{
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }
    });

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions:{
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contactus }
  }, {
    navigationOptions:{
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }
});

const AboutusNavigator = createStackNavigator({
    Aboutus: { screen: Aboutus }
  }, {
    navigationOptions:{
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            }
        }
});

const MainNavigator= createDrawerNavigator({

    Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home",
                drawerLabel: 'Home  '
            }
        },

     Aboutus: {
            screen: AboutusNavigator,
            navigationOptions: {
                title: "About us",
                drawerLabel: 'About us'
            }
            },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: "Menu",
            drawerLabel: 'Menu'
        }
        },

    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: "Contact us",
            drawerLabel: 'Contact us'
        }
        }
    },
  {
    drawerBackgroundColor: '#D1C4E9'
  });
class Main extends Component
{
    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS=="ios" ?0 :Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;