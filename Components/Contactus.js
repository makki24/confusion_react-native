import React, {Component} from "react";
import {Button, Card, Icon} from "react-native-elements";
import {Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contactus extends Component
{

    sendMain()
    {
        MailComposer.composeAsync({
            recipients:['syedmaqthyar@gmail.com'],
            subject:'Enquiry',
            body:'To whoom it concerns'
        });
    }

    render()
    {
        return (
            <Animatable.View animation={'fadeInDown'}>
                <Card title={'Contact Information'}>
                    <Text>
                        121, Clear Water Bay Road {'\n'}{'\n'}
                        Clear Water Bay, Kowloon {'\n'}{'\n'}
                        HONG KONG{'\n'}{'\n'}
                        Tel: +852 1234 5678{'\n'}{'\n'}
                        Fax: +852 8765 4321{'\n'}{'\n'}
                        Email:confusion@food.net
                    </Text>
                    <Button
                        title={'Send Email'}
                        icon={<Icon name={'envelope-o'} type={"font-awesome"} iconStyle={{marginRight:10}}/> }
                        onPress={this.sendMain}
                        buttonStyle={{backgroundColor:'#512DA8'}}
                        />
                </Card>
            </Animatable.View>
        );
    }
}

export default Contactus;