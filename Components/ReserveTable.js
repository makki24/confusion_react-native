import React, {Component} from "react";
import {ScrollView, Text, View, StyleSheet, Switch, Button, Modal, Alert, ToastAndroid} from "react-native";
import {Picker} from "react-native";
import DatePicker from "react-native-datepicker";
import * as Animatable from 'react-native-animatable';
import {Notifications} from "expo";
import * as Permissions from "expo-permissions"
import * as Calendar from "expo-calendar";

const styles =StyleSheet.create({
    formRow :{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },

    formLable:{
        flex: 2,
        fontSize:10
    },

    formItem:{
        flex: 1
    },
     modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        backgroundColor: '#512DA8',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


class Reservation extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            guests: 1,
            outside: false,
            date:'',
            showModel:false
        }
    }

    async obtainNotificationPermission()
    {
        let permission=await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status!=='granted')
        {
            permission=await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status!=='granted')
            {
                Alert.alert('Permission Not Granted ');
            }
        }

        return permission;
    }

    async handleCalendar(date)
    {
        const cal_permission= await Permissions.askAsync(Permissions.CALENDAR);

        if(cal_permission.status==='granted')
        {
            console.log("Start is "+new Date(Date.parse(date)));
            console.log("End is "+new Date(Date.parse(date)+7200000));
            Calendar.createEventAsync('1',{
                title: 'Confusion Table Reservation',
                startDate:new Date(Date.parse(date)),
                endDate:new Date(Date.parse(date)+7200000),
                timeZone:"Asia/Kolkata",
                location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            });
        }
        else
            console.log("not granted");
    }
    async presentLocalNotification(date)
    {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title:'Your reservation',
            body: 'Reservation is  requested'+date,
            ios:{
                sound:true
            },
            android:{
                sound:true,
                vibrate:true,
                color: '#512DA8'
            }
        })
    }

     static navigationOptions={
            title: 'Reserve Table '
    }

    toggleModal()
    {
        this.setState({
            showModel:!this.state.showModel
        });
    }
    handleReserve()
    {
        console.log(JSON.stringify(this.state));
        Alert.alert('Your Reservation OK ?','Number of Guests: '+this.state.guests+'\nSmoking ? '+
            this.state.outside+'\nDate and Time: '+this.state.date,[{
            text:'cancel',
            style:'cancel',
            onPress:()=>this.formReset()
        },
            {
                text:'OK',
                onPress:()=>
                {
                    this.presentLocalNotification(this.state.date);
                    this.handleCalendar(this.state.date);
                    this.formReset();
                }
            }])
    }

    formReset()
    {
        this.setState({
            guests:1,
            outside:false,
            date:''
        });
    }
    render()
    {

        return(
            <Animatable.View animation={"zoomIn"}>
            <ScrollView>
                   <View style={styles.formRow}>
                       <Text style={styles.formLable}>Number of guests</Text>
                       <Picker style={styles.formItem}
                               selectedValue={this.state.guests}
                               onValueChange={(itemValue,itemIndex)=>this.setState({
                                   guests:itemValue
                               })}>
                           <Picker.Item label={'1'} value={'1'} />
                           <Picker.Item label={'2'} value={'2'} />
                           <Picker.Item label={'3'} value={'3'} />
                           <Picker.Item label={'4'} value={'4'} />
                           <Picker.Item label={'5'} value={'6'} />
                       </Picker>
                   </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLable}>Outside/Inside</Text>
                    <Switch style={styles.formItem}
                            value={this.state.outside}
                            onTintColor='#512DA8'
                            onValueChange={(Item) => this.setState({outside:Item})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={{flex:1, fontSize:10}}>Date and Time </Text>
                    <DatePicker
                     style={{flex:2, marginRight:20, backgroundColor:''}}  date={this.state.date} onDateChange={(date)=>
                     this.setState({date: date})} placeholder={'select date and time'}
                     format={''} mode={"datetime"} minDate={new Date().toISOString()} confirmBtnText={'confirm'}
                     cancelBtnText={'cancel now'} customStyles={{
                         dateIcon:{
                             position: 'absolute',
                             marginLeft :0,
                             top :4,
                             left:0
                         },
                        dateInput:{
                             marginLeft: 36
                        }
                    }} />
                </View>
                <View style={{marginRight:18,marginLeft:18}}>
                    <Button title={'Reserve'} onPress={()=>this.handleReserve()} color={'#512DA8'} accessibilityLabel={'learn More'}/>
                </View>
                 <Modal onDismiss={() =>this.toggleModal()} visible={this.state.showModel} onRequestClose={()=> this.toggleModal()}
                 animationType={'slide'} transparent={false} >
                     <View style={styles.modal}>
                         <View style={styles.modalTitle}><Text style={{color:'white', fontSize: 18, fontWeight: 'bold',}}>Your Reservation </Text>
                         </View>
                         <View style={styles.modalText}><Text>Number of Guests: {this.state.guests}</Text></View>
                         <View style={styles.modalText}><Text>Outside: {this.state.outside? "yes": "No"}</Text></View>
                         <View style={styles.modalText}><Text>Date and Time :{this.state.date}</Text></View>
                         <Button title={'close'} onPress={()=>{this.toggleModal();this.formReset();}}
                          color="#512DA8"/>
                     </View>
                </Modal>
            </ScrollView>
            </Animatable.View>
        );
    }
}
export default Reservation;