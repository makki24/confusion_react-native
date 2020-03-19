import React, {Component} from "react";
import {View, StyleSheet, Button} from "react-native";
import {CheckBox} from "react-native-elements";
import {Input} from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
class Login extends Component
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

    static navigationOptions={
        title: 'Login'
    };

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
           </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        margin:20
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