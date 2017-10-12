import React, { Component } from 'react'
import { Button, Image, Grid} from 'semantic-ui-react'
import { Card, Message, Dimmer,Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Pokedex.scss'

class Pokedex extends Component {
    constructor(props){
        super(props);
        //this.id = this.match.params.id;
        console.log(this);
        console.log(this.props.match.params.id);
        this.state = {};
        this.id = this.props.match.params.id;
        this.entry = "";
        this.next = 0;
        this.prev = 0;
        this.loadingInfo = true;
        this.loadingEntry = true;


        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }
    componentWillReceiveProps(newProps){
        console.log("i got");
        console.log(newProps);
        this.id = newProps.match.params.id;
        this.loadingInfo = true;
        this.loadingEntry = true;
        this.componentDidMount();

    }
    componentDidMount(){
        console.log("mounting");

        axios.get("https://pokeapi.co/api/v2/pokemon/" + this.id)
            .then(function(response){
                console.log("Inside");
                console.log(this);
                let data = response.data;
                let types = [];
                let typeArray = data.types;
                console.log(data);
                console.log(typeArray);
                for (let i = 0 ; i<typeArray.length ; i++) {
                    types.push(typeArray[i]["type"]["name"]);
                }
                let ability = data.abilities[0]["ability"]["name"];

                let newState = {
                    id: this.id,
                    name: data.name.toString().toUpperCase(),
                    sprite: data.sprites.front_default,
                    spriteShiny: data.sprites.front_shiny,
                    types: types,
                    weight: data.weight,
                    ability: ability

                };

                this.prev = parseInt(this.id) - 1;
                if(this.prev < 0){
                    this.prev = 802
                }

                this.next = parseInt(this.id) + 1;
                if(this.next > 802){
                    this.next = 1;
                }

                this.state = newState;
                this.loadingInfo = false;
                if(!this.loadingEntry){
                    this.forceUpdate();
                }
                }.bind(this)

            );
        axios.get("https://pokeapi.co/api/v2/pokemon-species/" + this.id)
            .then(function(response){
                // 1 is the english index
                this.entry = response.data.flavor_text_entries[1]["flavor_text"];
                this.loadingEntry = false;
                if(!this.loadingInfo){
                    this.forceUpdate();
                }
            }.bind(this));

    }
    render(){
        let stillLoading = !(!(this.loadingEntry) && !(this.loadingInfo));
        console.log(stillLoading);
        let prevLink = '/pokemon/' + this.prev;
        let nextLink = '/pokemon/' + this.next;
        return (
            <div className="Pokedex">
                <Dimmer active={stillLoading} page={true}><Loader>Loading Pokedex...</Loader></Dimmer>
                <Button>
                    <Link to="/search">Search</Link>
                </Button>
                <Button>
                    <Link to="/gallery">Gallery</Link>
                </Button>
                <div className="Panels">
                <Grid columns={3} >
                    <Grid.Column>
                        <Card>

                            <Image avatar src={this.state.sprite}
                                   style={{width: 300, height: 300}}
                            />

                            <Card.Header>Normal Front</Card.Header>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Image avatar src={this.state.spriteShiny}
                                   style={{width: 300, height: 300}}
                            />

                            <Card.Header>Shiny Front</Card.Header>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                <Message>
                    <Message.Header>#{this.state.id} {this.state.name}</Message.Header>
                    Types: {this.state.types}<br/>
                    Ability: {this.state.ability}<br/>
                    Weight: {this.state.weight}lbs.<br/>

                    {this.entry}





                </Message>
                        <Link to={prevLink}>
                        <Button>Prev</Button>
                        </Link>
                        <Link to={nextLink}>
                        <Button>Next</Button>
                        </Link>
                    </Grid.Column>
                </Grid>
                </div>
            </div>)
    }
}

export default Pokedex
