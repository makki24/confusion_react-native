import React,{Component} from "react";
import Home  from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {Platform, SafeAreaView, ScrollView, View, StyleSheet,Text,Image} from "react-native";
import {createDrawerNavigator,createStackNavigator,DrawerItems} from "react-navigation";
import Contactus from "./Contactus";
import Aboutus from "./Aboutus";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {fetchComments, fetchDishes,fetchLeaders, fetchPromos} from "../redux/ActionCreaters";

const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu,
    navigationOptions:({navigation}) =>({
        headerLeft: <Icon name={'menu'} size={24}
                    color={'white'}
                    onPress={()=>navigation.toggleDrawer() }
        />
})},
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
    navigationOptions:({navigation}) =>({
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            },
            headerLeft: <Icon name={'menu'} size={24}
                    color={'white'}
                    onPress={()=>navigation.toggleDrawer() } />
        })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contactus }
  }, {
    navigationOptions:({navigation}) =>({
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            },
            headerLeft: <Icon name={'menu'} size={24}
                    color={'white'}
                    onPress={()=>navigation.toggleDrawer() } />
        })
});

const AboutusNavigator = createStackNavigator({
    Aboutus: { screen: Aboutus }
  }, {
    navigationOptions:({navigation}) =>({
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            headerTintColor:'#fff',
            headerTitleStyle: {
                color:'#fff'
            },
            headerLeft: <Icon name={'menu'} size={24}
                    color={'white'}
                    onPress={()=>navigation.toggleDrawer() } />
        })
});

const CustomDrawerComponent=(props) =>(
    <ScrollView>
        <SafeAreaView style={styles.container}
        forceInset={{top:'always',horizontal:'never'}}>
            <View style={styles.drawerHeader} >
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}  style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
);
const MainNavigator= createDrawerNavigator({

    Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home",
                drawerLabel: 'Home  ',
                drawerIcon:({tintColor}) =>
                    (<Icon name={'home'} type={'font-awesome'} color={'tintColor'}
                           size={24} />)
            }
        },

     Aboutus: {
            screen: AboutusNavigator,
            navigationOptions: {
                title: "About us",
                drawerLabel: 'About us',
                drawerIcon:({tintColor}) =>
                    (<Icon name={'info-circle'} type={'font-awesome'} color={'tintColor'}
                           size={24} />)
            }
            },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: "Menu",
            drawerLabel: 'Menu',
            drawerIcon:({tintColor}) =>
                    (<Icon name={'list'} type={'font-awesome'} color={'tintColor'}
                           size={24} />)
        }
        },

    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: "Contact us",
            drawerLabel: 'Contact us',
             drawerIcon:({tintColor}) =>
                    (<Icon name={'address-card'} type={'font-awesome'} color={tintColor}
                           size={23} />)
        }
        }
    },
  {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerComponent
  });

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})
class Main extends Component
{
      componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  };


    render() {
        console.disableYellowBox = true;
        return (
            <View style={{flex:1, paddingTop: Platform.OS=="ios" ?0 :Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },

    drawHeaderText:{
        color:'white',
        fontWeight:'bold',
        fontSize:24
    },
    drawerImage:{
        margin:10,
        width:80,
        height: 60
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(Main);