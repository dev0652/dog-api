import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
// import { GlobalStyle } from './GlobalStyle';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

// ##################################################

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {}
  }

  selectBreed = async option => {
    try {
      const response = await axios.get('/images/search', {
        params: {
          breed_ids: option.value,
        },
      });

      this.setState({ dog: response.data[0] });
    } catch (error) {}
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const options = this.buildSelectOptions();
    const { dog } = this.state;

    return (
      <>
        <Select options={options} onChange={this.selectBreed} />

        {dog && (
          <div>
            <img src={dog.url} width="480" alt="dog" />
          </div>
        )}

        {/* <GlobalStyle/> */}
      </>
    );
  }
}
