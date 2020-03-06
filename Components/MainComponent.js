import React,{Component} from "react";
import {DISHES} from "../shared/dishes";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {View} from "react-native";

class Main extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            dishes: DISHES,
            selectedDish: null
        };
    }
    selectDish(dishId)
    {
        this.setState({
            selectedDish:dishId
        })
    }
    render() {
        return (
            <View>
                <Menu dishes={this.state.dishes} onPress={(dishId)=>this.selectDish(dishId)}/>
                <DishDetail dish={this.state.dishes.filter( (dish) => dish.id===this.state.selectedDish)[0]}/>
            </View>
        );
    }
}

export default Main;