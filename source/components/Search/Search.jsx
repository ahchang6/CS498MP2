import React, { Component } from 'react'
import axios from 'axios'
import ListTwo from '../List/List.jsx'
import { Dropdown } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Button, Dimmer, Loader} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Search.scss'

class Search extends Component {
/*
   handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  }
*/
    constructor(props){
        super(props);
        console.log(this);
        this.allPokemon = [];
        this.searchWord = "";
        this.currentList = [];
        this.currentListShown = [];
        this.currentHelper = [];
        this.allPokemonArray = [];
        this.pokemonPreped = [];
        // for the loading moduel
        this.loading = true;
        // will be pokemon sorted alphabetically

        this.sortMethod= 0;
        this.getAllPokemon = this.getAllPokemon.bind(this);
        this.filterPokemon = this.filterPokemon.bind(this);
        this.changeSorting = this.changeSorting.bind(this);

    }
    static getPokemon(pokemonNumber) {
        return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonNumber + "/");

    }
    getAllPokemon(){
        console.log("starting");
        axios.get("https://pokeapi.co/api/v2/pokemon/?limit=900")
            .then(function(response){
                this.allPokemonArray = response.data.results;
                // parsing to tuple
                for(let i = 0; i<this.allPokemonArray.length; i++){
                    let curPoke = [parseInt(this.allPokemonArray[i]["url"].slice(34,-1)), this.allPokemonArray[i]["name"]];
                    this.pokemonPreped.push(curPoke);
                }
                this.currentList = this.pokemonPreped;
                console.log(this.pokemonPreped);
                console.log("ready");
                this.loading=false;

                //intital showing
                let currentPokemonList = this.currentList.slice(0, 15);
                console.log(this.currentList);
                this.currentListShown = [];
                for (let i = 0; i < currentPokemonList.length; i++) {
                    this.currentListShown.push(currentPokemonList[i]);
                }



                this.forceUpdate();

            }.bind(this));

    }
    // sets everything up before laoding
    componentDidMount(){
        this.getAllPokemon();
        console.log("Search Mounted");
    }
  render() {
      const options = [
          { value: 0, text: 'Pokedex Number (ascending)' },
          { value: 1, text: 'Pokedex Number (descending)' },
          { value: 2, text: 'Pokedex Name (ascending)' },
          { value: 3, text: 'Pokemon Name (descending)' },
      ];
      return (
          <div className="Search">
              <div className="redirect">
                  <Button>
                      <Link to="/search">Search</Link>
                  </Button>
                  <Button>
                      <Link to="/gallery">Gallery</Link>
                  </Button>
              </div>
              <Dimmer active={this.loading}>
                  <Loader>Loading Pokedex</Loader>
              </Dimmer>
              <Form>
                  <Form.Field>
                      <label>Pokemon Search</label>
                      <input
                          placeholder="Start Typing a Pokemon..."
                          onChange={this.filterPokemon}
                      />
                  </Form.Field>
              </Form>
              <Dropdown
                  placeholder="Sorting"
                  selection
                  search
                  options={options}
                  onChange={this.changeSorting}
              />
              <ListTwo items={this.currentListShown} />
          </div>
      )
  }

    changeSorting(event, data){
        let newSort = data.value;
        console.log(newSort);
        if(this.sortMethod === newSort){
            return
        }
        this.sortMethod = newSort;
        // numerical
        if(newSort === 0){
            this.currentList = this.currentList.sort( function(a, b){
                if(a[0] < b[0]) return -1;
                if(a[0] > b[0]) return 1;
                return 0;
            });
            this.pokemonPreped = this.pokemonPreped.sort( function(a, b){
                if(a[0] < b[0]) return -1;
                if(a[0] > b[0]) return 1;
                return 0;
            });
        }
        // numerical descending
        else if(newSort === 1){
            this.currentList = this.currentList.sort( function(a, b){
                if(a[0] < b[0]) return 1;
                if(a[0] > b[0]) return -1;
                return 0;
            });
            this.pokemonPreped = this.pokemonPreped.sort( function(a, b){
                if(a[0] < b[0]) return 1;
                if(a[0] > b[0]) return -1;
                return 0;
            });
        }
        // alphabetical
        else if(newSort === 2) {
            this.currentList = this.currentList.sort(function (a, b) {
                if (a[1] < b[1]) return -1;
                if (a[1] > b[1]) return 1;
                return 0;
            });
            this.pokemonPreped = this.pokemonPreped.sort(function (a, b) {
                if (a[1] < b[1]) return -1;
                if (a[1] > b[1]) return 1;
                return 0;
            });
        }
        // alphabetical descending
        else if(newSort === 3) {
            this.currentList = this.currentList.sort(function (a, b) {
                if (a[1] < b[1]) return 1;
                if (a[1] > b[1]) return -1;
                return 0;
            });
            this.pokemonPreped = this.pokemonPreped.sort(function (a, b) {
                if (a[1] < b[1]) return 1;
                if (a[1] > b[1]) return -1;
                return 0;
            });
        }
        let currentPokemonList = this.currentList.slice(0, 15);
        console.log(this.currentList);
        this.currentListShown = [];
        for (let i = 0; i < currentPokemonList.length; i++) {
            this.currentListShown.push(currentPokemonList[i]);
        }



        this.forceUpdate();




    }
  filterPokemon(event) {
      //search in form
      let currentSearch = event.target.value;

      if (currentSearch.length < this.searchWord.length) {
          this.currentList = this.pokemonPreped;
      }
      this.currentHelper = [];

      for (let i = 0; i < this.currentList.length; i++) {
          if (currentSearch.length === 0) {
              this.currentHelper = this.pokemonPreped;
              break
          }
          let curPoke = this.currentList[i][1];
          if (curPoke.indexOf(currentSearch) !== -1) {
              this.currentHelper.push(this.currentList[i]);
          }
      }
      this.currentList = this.currentHelper;
      // stores the dictionaries
      // we only want 8
      let currentPokemonList = this.currentList.slice(0, 8);
      this.currentListShown = [];
      console.log(currentPokemonList);
      for (let i = 0; i < currentPokemonList.length; i++) {
          this.currentListShown.push(currentPokemonList[i]);
      }


      this.searchWord = currentSearch;

      this.forceUpdate();

  }

}

export default Search
