import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './Pokedex.scss'
import { Card } from 'semantic-ui-react'

class Pokedex extends Component {
    constructor(props){
        super(props);
        //this.id = this.match.params.id;
        console.log(this.props.params);

    }
    render(){
        return (<div className="Pokedex">
            <Button>
                <Link to="/search">Search</Link>
            </Button>
            <Button>
                <Link to="/gallery">Gallery</Link>
            </Button>
            <a>WOW</a>
        </div>)
    }
}

export default Pokedex
