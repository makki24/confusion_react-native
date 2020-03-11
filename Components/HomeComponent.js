import React, {Component} from "react";
import {ScrollView, Text} from "react-native";
import {View} from "react-native";
import {Card} from "react-native-elements";
import {connect} from 'react-redux';
import {baseUrl} from "../shared/baseUrl";
import {Loading} from "./LoadingComponent";


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }


function RenderItem(props)
{
    if(props.isLoading)
    {
        return <Loading/>
    }
    else if(props.errmsg!=null)
    {
        return (
            <View>
                <Text>
                    {props.errmsg}
                </Text>
            </View>
        );
    }
    else
    {
        const item = props.item;
        if (item != null)
        {
            return (
                <Card featuredTitle={item.name} featuredSubtitle={item.designation} image={{uri: baseUrl + item.image}}>
                    <Text style={{margin: 10}}>{item.description}</Text>
                </Card>);
        } else
            return (
                <View></View>
            )
    }
}
class Home extends Component
{

    static navigationOptions={
        title:'Home'
    }
    render()
    {
        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter(item=> item.featured)[0]}
                 isLoading={this.props.dishes.isLoading} errmsg={this.props.dishes.errMess}/>
                <RenderItem item={this.props.promotions.promotions.filter(item=> item.featured)[0]}
                isLoading={this.props.promotions.isLoading} errmsg={this.props.promotions.errMess}/>
                <RenderItem item={this.props.leaders.leaders.filter(item=> item.featured)[0]}
                isLoading={this.props.leaders.isLoading} errmsg={this.props.leaders.errMess}/>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);