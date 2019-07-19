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
    master_breed: "terrier",
    sub_breed_results: [
      "american", "australian", "bedlington", "border",
      "dandie",   "fox",        "irish",      "norwich",
      "yorkshire","toy",        "tibetan",    "russel"
    ],
    dog_images: [],
    error: null
  }

  search(event) {
    let sub_breed = event.target.value.toLowerCase();
    let { master_breed } = this.state;
    const url = `https://dog.ceo/api/breed/${master_breed}/${sub_breed}/images`;

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
    let master_breed = event.target.value.toLowerCase()
    this.setState({ master_breed, sub_breed_results: [], dog_images: [] })
  }

  handleSubmit(event) {
    event.preventDefault();

    let { master_breed } = this.state;

    this.setSubBreedButtons(master_breed);
  }

  setSubBreedButtons(master_breed) {
    if (!master_breed) {
      this.setState({ error: "No search input received!" });
      return;
    }
    const url = `https://dog.ceo/api/breed/${master_breed}/list`;

    fetch(url, {cache: "force-cache"})
      .then(response => response.json())
      .then(data => {
         let subBreeds = data.message;

         if (Array.isArray(subBreeds)) {
           this.setState({ sub_breed_results: subBreeds });
           this.setState({ error: null });
         } else {
           this.setState({ error: data.message });
         }
      })
      .catch(error => this.setState({ error }) );
  }

  setDogImages(images) {
    this.setState({ dog_images: images });
  }

  render() {
    let { sub_breed_results, error, dog_images } = this.state;

    return (
      <Container className="mt-3">
        <div className="row">
          <div className="col-12">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Input
                type="text"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                placeholder="Search by master breed..."
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
          {sub_breed_results.map(val => {
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
