import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'

import styles from './List.scss'
/*
class List extends Component {

    render() {
        return (
            <div>
            <ul className="list-group">
                {
                    //filteredPokemon.map(function(pokemon) {
                    this.props.items.map(function(item) {
                        return ( <li className="list-group-item" data-category={item} key={item}>{item}</li>)
                    })
                }
                    </ul>
                    }
                ) }
                }

}*/
//https://react.semantic-ui.com/elements/list#list-example-image
class ListTwo extends Component{
    constructor(props) {
        super(props);
    }
    getPokemonSprite(number){
        console.log(number);
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number + ".png"
    }
    render(){
        return (
            // so the text aligns with image
            <List selection verticalAlign='middle'>
                {
                    this.props.items.map(function(item) {
                        let linkTo = "/pokemon/" + item[0];
                        console.log(item);
                        return (
                            <Link to={linkTo}>
                            <List.Item>
                                <Image avatar src={this.getPokemonSprite(item[0])}
                                style={{width: 50, height: 50}}
                                />

                                <List.Content>
                                    <List.Header>{item[0] + " " + item[1]}</List.Header>
                                </List.Content>
                            </List.Item>
                            </Link>

                        )
                    }.bind(this))
                }
            </List>
        )
    }

}

export default ListTwo
