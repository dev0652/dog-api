import React, { Component } from 'react';
import Select from 'react-select';

import { fetchBreeds } from 'api';
import { ErrorMessage } from './Error';

// ##################################################

export class BreedSelect extends Component {
  state = {
    breeds: [],
    error: null,
    isLoading: false,
  };

  // #### Lifecycle

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const breeds = await fetchBreeds();
      this.setState({ breeds });
    } catch {
      this.setState({
        error:
          'Oops, something went wrong. Please try again or reload the page',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // #### Methods

  buildOptions = () => {
    const { breeds } = this.state;

    return breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  // #### Rendering

  render() {
    const { error, isLoading } = this.state;
    const { onSelect } = this.props;
    const options = this.buildOptions();

    return (
      <>
        <Select
          options={options}
          isLoading={isLoading}
          onChange={option => onSelect(option.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }
}
