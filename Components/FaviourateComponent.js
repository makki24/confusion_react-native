import React, {Component} from "react";
import {FlatList, Text, View} from "react-native";
import {ListItem} from "react-native-elements";
import {connect} from "react-redux";
import {baseUrl} from "../shared/baseUrl";
import {Loading} from "./LoadingComponent";

const mapStateToProps = state =>
{
    return {
        dishes: state.dishes,
        faviourates:state.faviourates
    }
}
class Faviourate extends Component
{
    static navigationOptions={
        title:'My Faviourates'
    }
    constructor()
    {
        super();
    }

    render()
    {
        const {navigate} =this.props.navigation;

        const renderMenu =({item,index}) =>
        {
            return(
              <ListItem
                  key={index}
                  title={item.name}
                  leftAvatar={{source:{uri:baseUrl+item.image}}}
                  subtitle={item.description}
                  hideChevron={true}
                  onPress={()=>navigate('DishDetails',{dishId: item.id})}
              />
            );
        }

        if(this.props.dishes.isLoading)
            return <Loading/>
        else if (this.props.dishes.errMess!=null)
            return(
                    <View><Text>{this.props.errMess}</Text></View> );
        else
        {
            return (
                    <FlatList data={this.props.dishes.dishes.filter((dish) =>
                        this.props.faviourates.some(el => el === dish.id)
                    )} renderItem={renderMenu} keyExtractor={item => item.id.toString()}/>
            );
        }
    }
}

export default connect(mapStateToProps)(Faviourate);