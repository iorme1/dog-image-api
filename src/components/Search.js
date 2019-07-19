import React, { Component } from 'react';
import {
  Container,
  Input,
  Form,
} from 'reactstrap';
import BreedButton from './BreedButton';
import DogImage from './DogImage';

class Search extends Component {
  state = {
    breed: "terrier",
    breed_results: [
      "american", "australian", "bedlington", "border",
      "dandie",   "fox",        "irish",      "norwich",
      "yorkshire","toy",        "tibetan",    "russel"
    ],
    dog_images: [],
    error: null,
    breed_list: []
  }

  componentDidMount() {
    const url = "https://dog.ceo/api/breeds/list/all";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let breed_list = data.message;
        this.setState({ breed_list });
      });
  }

  search(event) {
    let sub_breed = event.target.value.toLowerCase();
    let { breed, breed_results } = this.state;
    let breedURL = breed_results.length > 1 ?
      `${breed}/${sub_breed}` :
      `${breed}`;

    const url = `https://dog.ceo/api/breed/${breedURL}/images`;

    fetch(url, {cache: "force-cache"})
      .then(res => res.json())
      .then(data => {
        let image_urls = data.message;

        if (Array.isArray(image_urls)) {
          this.setDogImages(image_urls);
          this.setState({ error: null });
        } else {
          this.setState({ error: data.message, dog_images: [] });
        }
      })
      .catch(error => this.setState({ error }))
  }

  handleChange(event) {
    let breed = event.target.value.toLowerCase()
    this.setState({ breed, breed_results: [], dog_images: [] })
  }

  handleSubmit(event) {
    event.preventDefault();

    let { breed } = this.state;

    this.setBreedButtons(breed);
  }

  setBreedButtons(breed) {
    let { breed_list } = this.state;

    if (breed_list[breed] !== undefined) {
      this.setState({ error: null}); // reset error if currently displayed
      if (breed_list[breed].length === 0) {
        this.setState({ breed_results: [this.state.breed] })
      } else {
        this.setState({ breed_results: breed_list[breed] })
      }
    } else {
      this.setState({ error: "Please enter a valid breed name."});
      return;
    }
  }

  setDogImages(images) {
    this.setState({ dog_images: images });
  }

  render() {
    let { breed_results, error, dog_images } = this.state;

    return (
      <Container className="mt-3">
        <div className="row">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Input
                type="text"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                placeholder="Enter master breed name..."
              />
              <Input
                type="submit"
                className="btn btn-primary form-control"
                value="Search"
              />
            </Form>
          </div>
        </div>

        <div className="row mt-5">
          {breed_results.map(val => {
            return (
              <BreedButton
                query={val}
                key={val}
                handleClick={this.search.bind(this)}
              />
            );
          })}
        </div>

        <div className="row mt-3 mb-5 text-center">
          {error ?
            <div className="col-12">
              <p className="error-msg">{error}</p>
            </div>
            : null
          }

          {dog_images.map(image => {
            return (
              <DogImage
                key={image}
                dog_image={image}
              />
            );
          })}
        </div>
      </Container>
    )
  }
}

export default Search;
