import React, {Component} from "react";
import {FlatList} from "react-native";
import { Tile} from "react-native-elements";
import {DISHES} from "../shared/dishes";
import {baseUrl} from "../shared/baseUrl";

class Menu extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            dishes:DISHES
        }
    }

    static navigationOptions={
        title:'Menu'
    };
    render()
    {
        const renderMenuItem =({item,index}) =>
        {
            return(
                <Tile key={index}
                 title={item.name} caption={item.description}
                      featured
                 onPress={()=>this.props.navigation.navigate('DishDetails',{dishId:item.id})}
                 imageSrc={{uri:baseUrl+ item.image}}
                />
            );
        };
        return(<FlatList data={this.state.dishes} renderItem={renderMenuItem}
                  keyExtractor={(item) => item.id.toString()}/>)
    }
}

export default Menu;