import React, { Component } from 'react';
// import { GlobalStyle } from './GlobalStyle';
import { Dog } from './Dog/Dog';

import { fetchBreeds } from 'api';
import { fetchDogByBreed } from 'api';
import { BreedSelect } from './BreedSelect/BreedSelect';

// ##################################################

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
  };

  // #### Lifecycle

  async componentDidMount() {
    try {
      const breeds = await fetchBreeds();
      this.setState({ breeds: breeds });
    } catch (error) {
      this.setState({
        error:
          'Oops, something went wrong. Please try again or reload the page',
      });
    }
  }

  // #### Methods

  selectBreed = async breedId => {
    try {
      const dog = await fetchDogByBreed(breedId);
      this.setState({ dog });
    } catch (error) {
      this.setState({
        error:
          'Oops, something went wrong. Please try again or reload the page',
      });
    }
  };

  // #### Rendering

  render() {
    const { dog, error, breeds } = this.state;

    return (
      <>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />;
        {error && <div>{error}</div>}
        {dog && <Dog dog={dog} />}
        {/* <GlobalStyle/> */}
      </>
    );
  }
}
