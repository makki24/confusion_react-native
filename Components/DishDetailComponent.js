import React,{Component} from "react";
import {Card, Icon, AirbnbRating, Rating, Input} from "react-native-elements";
import {FlatList, StyleSheet, ScrollView, Text, Modal, Button, PanResponder, Alert} from "react-native";
import {View} from "react-native";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Stars from 'react-native-stars';
import {fetchFaviourates, postComment} from "../redux/ActionCreaters";
import * as Animatable from 'react-native-animatable';


const styles =StyleSheet.create({
    icons:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    buttons:{
        marginLeft:30,
        marginRight:30,
        marginTop:30
    },
     myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
})
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      faviorates: state.faviourates
    }
  }

  const mapDispatchToProps =dispatch =>
  {
      return {
          fetchFaviourates: (id) => dispatch(fetchFaviourates(id)),
          postComment: (id,name,rating,comment) =>dispatch(postComment(id,name,rating,comment))

      }
  }
class RenderDish extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            showModal:false,
            rating:5,
            name:null,
            comment:null
        }
    }

    handleSubmit()
    {
        this.props.postComment(this.props.id,this.state.name,this.state.rating,this.state.comment);
    }
    ratingCompleted(Rating)
    {
        this.setState({
            rating: Rating
        })
    }
    toggleModal()
    {
        this.setState({
            showModal:!this.state.showModal
        })
    };

    handleViewRef =(ref) => this.view=ref;
    render()
    {
        const recognizedrag =({dx}) =>
        {
            if(dx<-200)
                return true;
            else
                return  false;
        }
        const dish=this.props.dish;
        const panResponder= PanResponder.create({
            onStartShouldSetPanResponder:(e,gestureState) => (true),
            onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'Finished' : 'cancelled'));},
            onPanResponderEnd:(e,gestureState) => {
                if(recognizedrag(gestureState))
                    Alert.alert('Add to Faviourate','Do you Want to add '+dish.name+' Faviourate ?',
                        [{text:'cancel',style:'cancel',onPress:() =>console.log("Cancelled...")}
                        ,{
                            text:'Yes',onPress:()=>this.props.onPress(dish.id)
                        }])
            }
        });
        if (dish != null)
        {
            return (
                <Animatable.View animation={'fadeInDown'} ref={this.handleViewRef} {...panResponder.panHandlers}>
                    <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>{dish.description}</Text>
                        <View style={styles.icons}>
                            <Icon name={this.props.favorite ? 'heart' : 'heart-o'}
                                  raised
                                  reverse
                                  onPress={()=>this.props.onPress(dish.id)}
                                  type={'font-awesome'}
                                  color={'#f50'}
                            />
                            <Icon name={'pencil'}
                                  raised
                                  reverse
                                  onPress={()=>this.toggleModal()}
                                  color={'#512DA8'}
                                  type={'font-awesome'}
                            />
                        </View>
                        <View>
                            <Modal visible={this.state.showModal} animationType={'fade'} transparent={false}>
                                <Rating
                                 showRating
                                 startingValue={5}
                                 onFinishRating={(rating)=>this.ratingCompleted(rating)}/>
                                 <Input
                                        leftIcon={<Icon
                                                  type={"font-awesome"}
                                                  name='user-o'
                                                  size={24}
                                                       />}
                                        leftIconContainerStyle={{marginRight:10}}
                                        placeholder={'Author'}
                                        onChangeText={(data)=>this.setState({name:data})}
                                       />
                                 <Input
                                        leftIcon={<Icon
                                                  type={"font-awesome"}
                                                  name='comment-o'
                                                  size={24}
                                                       />}
                                        leftIconContainerStyle={{marginRight:10}}
                                        placeholder={'Comment'}  onChangeText={(data)=>this.setState({comment:data})}/>
                                 <View style={styles.buttons}>
                                    <Button title={'Submit'} onPress={()=>{this.handleSubmit();this.toggleModal();}} color={'#512DA8'} />
                                 </View>
                                <View style={styles.buttons}>
                                    <Button title={'cancel'} onPress={()=>this.toggleModal()} color={'grey'} />
                                </View>
                            </Modal>
                        </View>
                    </Card>
                </Animatable.View>
            );

        } else
        {
            return (
                <View>
                </View>
            );
        }
    }
}


function RenderComments(props)
{
    const comments=props.comments

    const renderComm=({item,index})=>(
        <View style={{margin:10}} key={index}>
            <Text style={{fontSize:14}}>{item.comment}</Text>
            <View style={{flex:1, flexDirection:'row'}}>
                <Stars count={item.rating}
                       emptyStar={<Icon type={"font-awesome"} name={'star'} color={'#ffc61a'}/> }
                />
                <Stars count={5-item.rating}
                       emptyStar={<Icon type={"font-awesome"} name={'star-o'} color={'#ffc61a'} /> }
                />
            </View>
            <Text style={{fontSize:12}}>{'--'+item.author+" , " +item.date}</Text>
        </View>
    );
    return(
        <Animatable.View animation={'fadeInUp'}>
            <Card title={'Comments'}>
                <FlatList data={comments} renderItem={renderComm}  keyExtractor={(item)=>item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}


class DishDetail extends Component
{
    constructor(props)
    {
        super(props);

    }
    markstate(id)
    {
        this.props.fetchFaviourates(id);
    }
    static navigationOptions={
        title: "Dish Details"
    };
    render()
    {
        const dishId=this.props.navigation.getParam("dishId","");
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId] } id={+dishId} favorite={this.props.faviorates.some((id)=>dishId===id)} onPress={
                    (id)=>this.markstate(id)
                } remove={(id)=>this.remove(id)} postComment={this.props.postComment} />
                <RenderComments comments={this.props.comments.comments.filter((comment) =>comment.dishId===dishId)}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);