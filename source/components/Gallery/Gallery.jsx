import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { Dimmer, Loader } from 'semantic-ui-react'
import GalleryModule from '../GallleryModule/GalleryModule.jsx'
import styles from './Gallery.scss'
import axios from 'axios'

class Gallery extends Component {
    constructor(prop){
        super(prop);
        // will be a dictionary of type names with a dict of pokemon in it
        this.types = {
        };
        this.finishedAmountOfTypes = 3;
        this.wantedTypes = [];
        this.processedPokemonArray = [1,2,3,4,5,6,7,8,9,10,11,12];
        this.rendered = 0;

        this.loading = true;
        this.getAllTypes = this.getAllTypes.bind(this);
        this.filterTypes = this.filterTypes.bind(this);
    }
    getAllTypes(){

        for(let i = 1; i <= this.finishedAmountOfTypes; i++) {
            axios.get("https://pokeapi.co/api/v2/type/" + i)
                .then(function (response) {
                    let type = response.data;
                    // contains all pokemon dict of type
                    let pokemonOfTypeArray = type.pokemon;
                    console.log(type);
                    console.log(pokemonOfTypeArray);
                    let typeName = type.name;
                    let typeDict = {};

                    for (let i = 0; i < pokemonOfTypeArray.length; i++) {
                        let pokemon = pokemonOfTypeArray[i]["pokemon"];
                        let pokeNum = pokemon["url"].slice(34, -1);
                        typeDict[pokeNum] = pokemon["name"];
                    }
                    this.types[typeName] = typeDict;
                    this.rendered += 1;
                    //when all have been rendered
                    if(this.rendered === this.finishedAmountOfTypes){
                        console.log("starting gallery");
                        this.loading = false;
                        this.forceUpdate();

                    }
                    this.forceUpdate();

                }.bind(this));
        }

    }
    componentDidMount(){
          this.getAllTypes();


    }
    render() {
        let typesKeys = Object.keys(this.types);
        console.log(typesKeys);
        return(
            <div className="Gallery">
                <Dimmer active={this.loading} page={true}><Loader>Loading Pokedex. This may take a few seconds</Loader></Dimmer>
                <div className="redirect">
                    <Button>
                        <Link to="/search">Search</Link>
                    </Button>
                    <Button>
                        <Link to="/gallery">Gallery</Link>
                    </Button>
                    <h1>Welcome to MP2!</h1>
                    <Grid columns={6} width={4}>
                    {
                        typesKeys.map(function(item) {
                            return (
                                <Grid.Column>
                                    <Checkbox toggle value={item} label={item} onChange={this.filterTypes}/>
                                </Grid.Column>
                            )
                        }.bind(this)

                    )
                    }
                    </Grid>
                    <GalleryModule items={this.processedPokemonArray}/>

                </div>
            </div>
        )
    }
    //https://stackoverflow.com/questions/11076067/finding-matches-between-multiple-javascript-arrays
    filterTypes(event, data){
       let checked = data.checked;
       let type = data.value;
       console.log(type);
        console.log(checked);
       // add if toggled to true
       if(checked){
           this.wantedTypes.push(type);
       }
       // remove otherwise
       else{
           this.wantedTypes.splice( this.wantedTypes.indexOf(type), 1 );
           if(this.wantedTypes.length ===0)
               return
       }
       console.log(this.wantedTypes);
        let arrayOfWantedTypes = [];

        for(let i = 0;i<this.wantedTypes.length;i++){
            // we grab the dict corresponding to type wanted
            let typeDict = this.types[this.wantedTypes[i]];
            // we grab only the keys because they are the pokemon ids
            let pokemonID = Object.keys(typeDict);

            arrayOfWantedTypes.push(pokemonID);
        }
        //array with only ids that contain all the wanted types
        let commonTypes = arrayOfWantedTypes.shift().filter(function(v) {
            return arrayOfWantedTypes.every(function(a) {
                return a.indexOf(v) !== -1;
            });
        });
        this.processedPokemonArray = commonTypes;
        this.forceUpdate();
    }
}

export default Gallery
