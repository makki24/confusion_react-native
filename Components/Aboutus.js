import React, {Component} from "react";
import {FlatList, ScrollView, Text, View} from "react-native";
import {Card, ListItem} from "react-native-elements";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

class Aboutus extends Component
{
    constructor(props)
    {
        super(props);
    }

    static navigationOptions={
        title:'About us'
    };

    render()
    {
        const renderLeaderItem=({item,index}) =>
        {
            return(
                <ListItem key={index} title={item.name} leftAvatar={{source:require('./images/alberto.png')}}
                hideCherovon={true} subtitle={item.description}/>
            );
        };
        return(
                <ScrollView>
                    <Card title={'Our History'}>
                        <Text>
                            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong.
                            With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list
                            clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what
                            will arrive on your plate the next time you visit us.{'\n\n'}

                            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan,
                            that featured for the first time the world's best cuisines in a pan.
                        </Text>
                    </Card>
                    <Card title={"Corporate Leadership"}>
                        <FlatList data={this.props.leaders.leaders} renderItem={renderLeaderItem} keyExtractor={(item) =>item.id.toString()} />
                    </Card>
                </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Aboutus);