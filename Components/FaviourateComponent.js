import React, {Component} from "react";
import {FlatList, Text, View} from "react-native";
import {ListItem} from "react-native-elements";
import {connect} from "react-redux";
import {baseUrl} from "../shared/baseUrl";
import {Loading} from "./LoadingComponent";
import {deleteFaviourates} from "../redux/ActionCreaters";
import Swipeout from "react-native-swipeout";

const mapStateToProps = state =>
{
    return {
        dishes: state.dishes,
        faviourates:state.faviourates
    }
}

const mapDispatchToProps = (dispatch) =>
    (
        {
            deleteFaviourates: (id) => dispatch(deleteFaviourates(id))
        }
    )
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
             const rightButton =[{
                text:'delete',
                type:'delete' ,
                onPress:()=>this.props.deleteFaviourates(item.id)
            }]
            return(
                <Swipeout right={rightButton} autoClose={true}>
                  <ListItem
                      key={index}
                      title={item.name}
                      leftAvatar={{source:{uri:baseUrl+item.image}}}
                      subtitle={item.description}
                      hideChevron={true}
                      onPress={()=>navigate('DishDetails',{dishId: item.id})}
                  />
                </Swipeout>
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

export default connect(mapStateToProps,mapDispatchToProps)(Faviourate);