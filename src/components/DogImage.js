import React from 'react';

const DogImage = (props) =>  {
  let { dog_image } = props;

  return (
    <div className="col-6 col-sm-4 mt-5">
      <img className="dog-image" src={dog_image} alt="dog_image"/>
    </div>
  );
}

export default DogImage;
