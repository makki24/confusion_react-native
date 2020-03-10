import React,{Component} from "react";
import {Card, Icon, ListItem} from "react-native-elements";
import {FlatList, ScrollView, Text} from "react-native";
import {View} from "react-native";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
  }

function RenderDish(props)
{
    const dish=props.dish;
    if(dish!=null)
    {
         return(
            <Card featuredTitle={dish.name} image={{uri:baseUrl+dish.image}}>
                <Text style={{margin:10}}>{dish.description}</Text>
                <Icon name={props.favorite ? 'heart':'heart-o'}
                      raised
                      reverse
                      onPress={props.favorite?()=>props.remove(dish.id):()=>props.onPress(dish.id)}
                      type={'font-awesome'}
                      color={'#f50'}
                      />
            </Card>
        );

    }
    else
    {
       return(
            <View>
            </View>
        );
    }
}

function RenderComments(props)
{
    const comments=props.comments

    const renderComm=({item,index})=>(
        <View style={{margin:10}} key={index}>
            <Text style={{fontSize:14}}>{item.comment}</Text>
            <Text style={{fontSize:12}}>{item.rating}{" stars"}</Text>
            <Text style={{fontSize:12}}>{'--'+item.author+" , " +item.date}</Text>
        </View>
    );
    return(
        <Card title={'Comments'}>
            <FlatList data={comments} renderItem={renderComm}  keyExtractor={(item)=>item.id.toString()} />
        </Card>
    );
}


class DishDetail extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            faviorates:[],
        }
    }
    markstate(id)
    {
        this.setState({
            faviorates:this.state.faviorates.concat(id)
        });
    }
    remove(id)
    {
        this.setState({
            faviorates:this.state.faviorates.filter((dishId)=> dishId!=id)
        });
    }
    static navigationOptions={
        title: "Dish Details"
    };
    render()
    {
        const dishId=this.props.navigation.getParam("dishId","");
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.state.faviorates.some((id)=>dishId===id)} onPress={
                    (id)=>this.markstate(id)
                } remove={(id)=>this.remove(id)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) =>comment.dishId===dishId)}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(DishDetail);