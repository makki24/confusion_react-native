import React, {Component} from "react";
import {ScrollView, Text} from "react-native";
import {View} from "react-native";
import {DISHES} from "../shared/dishes";
import {LEADERS} from "../shared/leaders";
import {PROMOTIONS} from "../shared/promotions";
import {Card} from "react-native-elements";

function RenderItem(props)
{
    const item=props.item;
    if(item!=null)
    {
        return(<Card featuredTitle={item.name} featuredSubtitle={item.designation} image={require('./images/uthappizza.png')}>
            <Text style={{margin: 10}}>{item.description}</Text>
        </Card>);
    }
    else
        return(
            <View></View>
        )
}
class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }

    static navigationOptions={
        title:'Home'
    }
    render()
    {
        return (
            <ScrollView>
                <RenderItem item={this.state.dishes.filter(item=> item.featured)[0]}/>
                <RenderItem item={this.state.promotions.filter(item=> item.featured)[0]}/>
                <RenderItem item={this.state.leaders.filter(item=> item.featured)[0]}/>
            </ScrollView>
        )
    }
}

export default Home;