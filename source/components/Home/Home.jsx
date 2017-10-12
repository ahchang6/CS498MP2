import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './Home.scss'
import { Card } from 'semantic-ui-react'

class Home extends Component {
    constructor(props){
        super(props);

    }/*
    render() {
        let currActivePage = this.activePage;
        return(
            <div className="Home">
                //{currActivePage===0?(<Search/>) : currActivePage===1? (<Gallery/>) : null}
            </div>
        )
    }*/
    render(){
        return (<div className="Home">
            <Button>
                <Link to="/search">Search</Link>
            </Button>
            <Button>
            <Link to="/gallery">Gallery</Link>
            </Button>
        </div>)
    }
}

export default Home
