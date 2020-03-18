import React, {Component} from "react";
import {Animated, Easing, ScrollView, Text} from "react-native";
import {View} from "react-native";
import {Card} from "react-native-elements";
import {connect} from 'react-redux';
import {baseUrl} from "../shared/baseUrl";
import {Loading} from "./LoadingComponent";
import AnimatedValue from "react-native-web/dist/vendor/react-native/Animated/nodes/AnimatedValue";


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

    animate()
    {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue,{
            toValue:8,
            duration:8000,
            easing:Easing.linear
        }).start(()=>this.animate())
    }

    constructor(props)
    {
        super(props);
        this.animatedValue=new Animated.Value(0);
    }
    componentDidMount(): void
    {
        this.animate();
    }

    static navigationOptions={
        title:'Home'
    }
    render()
    {
        const xpos1=this.animatedValue.interpolate({
            inputRange:[0,1,3,5,8],
            outputRange:[1200,600,0,-600,-1200]
        });

        const xpos2=this.animatedValue.interpolate({
            inputRange:[0,2,4,6,8],
            outputRange:[1200,600,0,-600,-1200]
        });

        const xpos3=this.animatedValue.interpolate({
            inputRange:[0,3,5,7,8],
            outputRange:[1200,600,0,-600,-1200]
        });

        return (
            <View style={{flex:1 ,flexDirection:'row'}}>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter(item=> item.featured)[0]}
                     isLoading={this.props.dishes.isLoading} errmsg={this.props.dishes.errMess}/>
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter(item=> item.featured)[0]}
                    isLoading={this.props.promotions.isLoading} errmsg={this.props.promotions.errMess}/>
                </Animated.View>
                <Animated.View style={{width:'100%', transform:[{translateX:xpos3}]}}>
                    <RenderItem item={this.props.leaders.leaders.filter(item=> item.featured)[0]}
                    isLoading={this.props.leaders.isLoading} errmsg={this.props.leaders.errMess}/>
                </Animated.View>
            </View>

        )
    }
}

export default connect(mapStateToProps)(Home);