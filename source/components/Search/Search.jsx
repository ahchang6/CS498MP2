import React, { Component } from 'react'
import axios from 'axios'
import List from '../List/List.jsx'
import { Dropdown } from 'semantic-ui-react'

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
                //this.allPokemon = response.data;

                this.allPokemonArray = response.data.results;
                /*
                this.currentList = this.allPokemonArray;
                */
                // parsing to tuple
                for(let i = 0; i<this.allPokemonArray.length; i++){
                    let curPoke = [parseInt(this.allPokemonArray[i]["url"].slice(34,-1)), this.allPokemonArray[i]["name"]];
                    this.pokemonPreped.push(curPoke);
                }
                this.currentList = this.pokemonPreped;
                console.log(this.pokemonPreped);
                console.log("ready");
            }.bind(this));

    }
    // sets everything up
    componentDidMount(){
      // this.getAllPokemon();
    }
  render() {
      const options = [
          { value: 0, text: 'Pokedex Number' },
          { value: 1, text: 'Pokemon Name' },
      ];
      return (
          <div>
          <form>
              <input
                  type="text"
                  placeholder="Search Pokemon,,,"

                  //value={this.props.filterText}

                  ref="filterTextInput"
                  onChange={this.filterPokemon}
              />
          </form>
          <Dropdown
         placeholder="Sorting"
         selection
         search
         options={options}
         onChange={this.changeSorting}
          />
          <List items={this.currentListShown} />
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
        // alphabetical
        else if(newSort === 1) {
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
            console.log(this.pokemonPreped);
        }
        let currentPokemonList = this.currentList.slice(0, 15);
        this.currentListShown = [];
        for (let i = 0; i < currentPokemonList.length; i++) {
            this.currentListShown.push(currentPokemonList[i][0].toString() + " " + currentPokemonList[i][1]);
        }



        this.forceUpdate();




    }
  filterPokemon(event) {
      //search in form
      let currentSearch = event.target.value;
      //TODO implement backspace

      if (currentSearch.length < this.searchWord.length) {
          this.currentList = this.pokemonPreped;
      }
      this.currentHelper = [];

      for (let i = 0; i < this.currentList.length; i++) {
          if (currentSearch.length === 0) {
              break
          }
          let curPoke = this.currentList[i][1];
          if (curPoke.indexOf(currentSearch) !== -1) {
              this.currentHelper.push(this.currentList[i]);
          }
      }
      this.currentList = this.currentHelper;
      // stores the dictionaries
      let currentPokemonList = this.currentList.slice(0, 15);
      this.currentListShown = [];
      console.log(currentPokemonList);
      for (let i = 0; i < currentPokemonList.length; i++) {
          this.currentListShown.push(currentPokemonList[i][0].toString() + " " + currentPokemonList[i][1]);
      }


      this.searchWord = currentSearch;

      this.forceUpdate();

  }

}

export default Search
