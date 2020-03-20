import React,{Component} from "react";
import Home  from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {Platform, SafeAreaView, ScrollView, View, StyleSheet, Text, Image, ToastAndroid} from "react-native";
import {createDrawerNavigator,createStackNavigator,DrawerItems} from "react-navigation";
import Contactus from "./Contactus";
import Aboutus from "./Aboutus";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {fetchComments, fetchDishes,fetchLeaders, fetchPromos} from "../redux/ActionCreaters";
import Reservation from "./ReserveTable";
import Faviourate from "./FaviourateComponent";
import Login from "./LoginComponent";
import NetInfo from "@react-native-community/netinfo";
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

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
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

const FaviourateNavigator = createStackNavigator({
   Faviourate: {screen: Faviourate,
    navigationOptions:({navigation}) =>({
        headerLeft: <Icon name={'menu'} size={24}
                    color={'white'}
                    onPress={()=>navigation.toggleDrawer() }
        />
})},
    DishDetails: {screen :DishDetail}
},
    {
        initialRouteName: 'Faviourate',
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

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
  }, {
    navigationOptions:({navigation}) =>({
            headerStyle :{
                backgroundColor: "#512DA8",
            },
            title:'Login',
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

    Login: {
            screen: LoginNavigator,
            navigationOptions: {
                title: "Login",
                drawerLabel: 'Login  ',
                drawerIcon:({tintColor}) =>
                    (<Icon name={'sign-in'} type={'font-awesome'} color={'tintColor'}
                           size={24} />)
            }
        },
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
                    (<Icon name={'address-card'} type={'font-awesome'} color={'tintColor'}
                           size={23} />)
        }
        },

     Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: "Reserve Table",
            drawerLabel: 'Reserve Table',
            drawerIcon:({tintColor}) =>
                    (<Icon name={'cutlery'} type={'font-awesome'} color={'tintColor'}
                           size={23} />)
        }
        },
     Faviourates: {
        screen: FaviourateNavigator,
        navigationOptions: {
            title: "Faviourates",
            drawerLabel: 'Faviourates',
            drawerIcon:({tintColor}) =>
                    (<Icon name={'heart'} type={'font-awesome'} color={'tintColor'}
                           size={23} />)
        }
        }
    },
  {
    initialRouteName:'Home',
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

    NetInfo.addEventListener(state =>
    {
      this.handleConnectivityChange(state);
    });
  };

  handleConnectivityChange =(connectionInfo) =>
  {
      switch (connectionInfo.type)
      {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
      }
  }
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