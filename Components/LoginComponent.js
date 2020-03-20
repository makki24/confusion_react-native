import React, {Component} from "react";
import {View, StyleSheet, ScrollView,Image} from "react-native";
import {CheckBox, Button, Input, Icon} from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {baseUrl} from "../shared/baseUrl";
import {createBottomTabNavigator} from 'react-navigation'
import * as Permission from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

class LoginTab extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            password:'',
            remember:false
        }
    }

    componentDidMount(): void
    {
        SecureStore.getItemAsync('userinfo').
            then(userdata => {
                var userinfo=JSON.parse(userdata);
                if(userinfo)
                {
                    this.setState({username:userinfo.username});
                    this.setState({password:userinfo.password});
                    this.setState({remember:true});
                }
            })
    }

    static navigationOptions= {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon name={'sign-in'} type={"font-awesome"} iconStyle={{color:tintColor}}/>
        )
    }

    handleLogin()
    {
        if(this.state.remember)
        {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username:this.state.username,
                password: this.state.password
            })).catch(err=>console.log('Could not save the information'));
        }

        else
        {
            SecureStore.deleteItemAsync('userinfo').catch((error)=>console.log('could not delete',error));
        }
    }

    render()
    {
        return(
           <View style={styles.container}>
               <Input
                   onChangeText={(username) => this.setState({username: username})}
                   placeholder={'username'}
                   leftIcon={{type:"font-awesome", name:'user-o'}}
                   leftIconContainerStyle={{marginRight:10}}
                   containerStyle={styles.formInput}
                   value={this.state.username}
               />
              <Input
                   onChangeText={(password) => this.setState({password: password})}
                   placeholder={'password'}
                   leftIcon={{type:"font-awesome", name:'key' }}
                   leftIconContainerStyle={{marginRight:10}}
                   containerStyle={styles.formInput}
                   value={this.state.password}
               />
              <CheckBox
                   title={'Remember me'}
                   containerStyle={styles.formCheckbox}
                   center
                   checked={this.state.remember}
                   onPress={()=>this.setState({remember:!this.state.remember})}
              />

              <View style={styles.formButton}>
                  <Button title={'Login'} onPress={()=>this.handleLogin()}
                          color={'#512DA8'}
                    />
              </View>
              <View style={styles.formButton}>
                  <Button title={'Register'} onPress={()=>this.props.navigation.navigate('Register')}
                          icon={{name:'user-plus', type:"font-awesome"}}
                          buttonStyle={{backgroundColor:'#512DA8'}}
                    />
              </View>
           </View>
        );
    }
}

class RegisterTab extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }
    static navigationOptions={
        title: 'register',
        tabBarIcon:({tintColor}) =>(
                <Icon name={'user-plus'} type={"font-awesome"} iconStyle={{color:tintColor}} />
        )
    }
    handleRegister()
    {
        console.log(JSON.stringify(this.state));
        if(this.state.remember)
        {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username:this.state.username,
                password: this.state.password
            })).catch(err=>console.log('Could not save the information'));

        }
    }

    handleCamera = async () =>
    {
        const cameraPermission =await Permission.askAsync(Permission.CAMERA);
        const cameraRollPermission= await Permission.askAsync(Permission.CAMERA_ROLL)

        if(cameraPermission.status==='granted' & cameraRollPermission.status==='granted')
        {
            let captureImage= await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect:[3,4]
            });

            if(captureImage.cancelled===false)
            {
                console.log(captureImage);
                this.setState({
                    imageUrl: captureImage.uri
                });
            }
        }
    }
    render()
    {
        return(
            <ScrollView>
               <View style={styles.container}>
                   <View style={styles.imageContainer}>
                       <Image source={{uri:this.state.imageUrl}}
                            style={styles.image}
                            loadingIndicatorSource={require('./images/logo.png')}
                       />
                       <Button title={'camera'} icon={{type:"font-awesome",name:'camera'}}
                       onPress={()=>this.handleCamera()}
                       />
                   </View>
                   <Input
                       onChangeText={(username) => this.setState({username: username})}
                       placeholder={'username'}
                       leftIcon={{type:"font-awesome", name:'user-o'}}
                       leftIconContainerStyle={{marginRight:10}}
                       containerStyle={styles.formInput}
                       value={this.state.username}
                   />
                  <Input
                       onChangeText={(password) => this.setState({password: password})}
                       placeholder={'password'}
                       leftIcon={{type:"font-awesome", name:'key' }}
                       leftIconContainerStyle={{marginRight:10}}
                       containerStyle={styles.formInput}
                       value={this.state.password}
                   />
                  <Input
                       onChangeText={(firstname) => this.setState({firstname: firstname})}
                       placeholder={'firstname'}
                       leftIcon={{type:"font-awesome", name:'user-o'}}
                       leftIconContainerStyle={{marginRight:10}}
                       containerStyle={styles.formInput}
                       value={this.state.firstname}
                  />
                  <Input
                       onChangeText={(lastname) => this.setState({lastname: lastname})}
                       placeholder={'lastname'}
                       leftIcon={{type:"font-awesome", name:'user-o'}}
                       leftIconContainerStyle={{marginRight:10}}
                       containerStyle={styles.formInput}
                       value={this.state.lastname}
                  />
                  <Input
                       onChangeText={(email) => this.setState({email: email})}
                       placeholder={'lastname'}
                       leftIcon={{type:"font-awesome", name:'envelope-o'}}
                       leftIconContainerStyle={{marginRight:10}}
                       containerStyle={styles.formInput}
                       value={this.state.email}
                  />
                  <CheckBox
                       title={'Remember me'}
                       containerStyle={styles.formCheckbox}
                       center
                       checked={this.state.remember}
                       onPress={()=>this.setState({remember:!this.state.remember})}
                  />

                  <View style={styles.formButton}>
                      <Button title={'Register'} onPress={()=>this.handleRegister()}
                              icon={{
                                  type:'font-awesome',
                                  name:'user-plus'
                              }}
                              buttonStyle={{
                                backgroundColor: "#512DA8"
                            }}
                        />
                  </View>
               </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login:LoginTab,
    Register: RegisterTab
},
    {
        tabBarOptions:{
        activeBackgroundColor: '#512DA8',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
        }
    })
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        margin:20
    },
     imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
});
export default Login;