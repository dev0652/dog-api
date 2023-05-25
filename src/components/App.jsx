import React, { Component } from 'react';
// import { GlobalStyle } from './GlobalStyle';
// import { PulseLoader } from 'react-spinners';
import DoorDashFavorite from './DogSkeleton';

import { Dog } from './Dog';
import { fetchDogByBreed } from 'api';
import { BreedSelect } from './BreedSelect';
import { ErrorMessage } from './Error';

// ##################################################

export class App extends Component {
  state = {
    dog: null,
    error: null,
    isLoading: false,
  };

  // #### Lifecycle

  // #### Methods

  selectBreed = async breedId => {
    try {
      this.setState({ isLoading: true });

      const dog = await fetchDogByBreed(breedId);
      this.setState({ dog });
    } catch {
      this.setState({
        error:
          'Oops, something went wrong. Please try again or reload the page',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // #### Rendering

  render() {
    const { dog, error, isLoading } = this.state;
    const { selectBreed } = this;

    return (
      <>
        <BreedSelect onSelect={selectBreed} />
        {/* <PulseLoader color="purple" loading={isLoading} size={15} /> */}

        {isLoading && <DoorDashFavorite />}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {dog && !isLoading && <Dog dog={dog} />}
        {/* <GlobalStyle/> */}
      </>
    );
  }
}
