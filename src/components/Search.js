import React, { Component } from 'react';
import {
  Container,
  Input,
  Form,
} from 'reactstrap';

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

  handleChange(event) {
    let master_breed = event.target.value.toLowerCase()
    this.setState({ master_breed, sub_breed_results: [], dog_images: [] })
  }

  handleSubmit(event) {
    event.preventDefault();

    let { master_breed } = this.state;

    this.setSubBreedButtons(master_breed)
  }

  setSubBreedButtons(master_breed) {
    const url = `https://dog.ceo/api/breed/${master_breed}/list`;

    fetch(url, {cache: "force-cache"})
      .then(response => response.json())
      .then(data => {
         let subBreeds = data.message;

         if (Array.isArray(subBreeds)) {
           this.setState({ sub_breed_results: subBreeds });
           this.setState({ error: null });
         } else {
           this.setState({ error: data.message })
         }
      })
      .catch(error => this.setState({ error }) );
  }

  setDogImages(images) {
    this.setState({ dog_images: images });
  }

  render() {

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
      </Container>
    )
  }
}

export default Search;
