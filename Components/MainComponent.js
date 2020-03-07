import React,{Component} from "react";
import {DISHES} from "../shared/dishes";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {Platform, View} from "react-native";
import createStackNavigator from "react-navigation/src/navigators/createStackNavigator";

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
    })

class Main extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            dishes: DISHES,
            selectedDish: null
        };
    }
    selectDish(dishId)
    {
        this.setState({
            selectedDish:dishId
        })
    }
    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS=="ios" ?0 :Expo.Constants.statusBarHeight}}>
                <MenuNavigator />
            </View>
        );
    }
}

export default Main;