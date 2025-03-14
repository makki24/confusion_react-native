import React, {Component} from "react";
import {FlatList, Text,View} from "react-native";
import { Tile} from "react-native-elements";
import {baseUrl} from "../shared/baseUrl";
import {connect} from "react-redux";
import {Loading} from "./LoadingComponent";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state =>
{
    return {
        dishes: state.dishes,
    }
}

class Menu extends Component
{
    static navigationOptions={
        title:'Menu'
    };
    render()
    {
        if(this.props.dishes.isLoading)
        {
            return (<Loading/> );
        }
        else if(this.props.dishes.errMess)
        {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        const renderMenuItem =({item,index}) =>
        {
            return(
                <Animatable.View animation={'fadeInRightBig'}>
                <Tile key={index}
                 title={item.name} caption={item.description}
                      featured
                 onPress={()=>this.props.navigation.navigate('DishDetails',{dishId:item.id})}
                 imageSrc={{uri:baseUrl+ item.image}}
                />
                </Animatable.View>
            );
        };
        return(<FlatList data={this.props.dishes.dishes} renderItem={renderMenuItem}
                  keyExtractor={(item) => item.id.toString()}/>)
    }
}

export default connect(mapStateToProps)(Menu);