import React, { Component } from 'react'
import { Button, Grid, Image, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './GalleryModule.scss'

class GalleryModule extends Component {
    constructor(props) {
        super(props);
    }
    getPokemonSprite(number){
        console.log(number);
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number + ".png"
    }
    render(){
        return (
            // so the text aligns with imagep
            <Grid columns={4}>
                {
                    this.props.items.map(function(item) {
                        console.log(item);
                        let route = "/pokemon/" + item;
                        return (
                            <Grid.Column>
                                <Link to={route}>
                            <Card>
                                <Image avatar src={this.getPokemonSprite(item)}
                                       style={{width: 300, height: 300}}
                                />

                                <Card.Header>{item}</Card.Header>
                            </Card>
                                </Link>
                            </Grid.Column>

                        )
                    }.bind(this))
                }
            </Grid>
        )
    }
}

export default GalleryModule
