import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
class List extends Component{
  constructor(props) {
    super(props);
  }

    render(){
        return (
            <ul className="list-group">
                {
                    this.props.items.map(function(item) {
                        return <li className="list-group-item" data-category={item} key={item}>{item}</li>
                    })
                }
            </ul>
        )
    }

}

export default List
