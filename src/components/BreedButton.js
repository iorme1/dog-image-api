import React from 'react';
import { Input } from 'reactstrap';

const BreedButton = (props) => {
  let { handleClick } = props;
  let { query } = props;

  return (
    <div className="col-md-3 col-4">
      <Input
        type="button"
        className="btn btn-outline-success m-1"
        value={query}
        onClick={handleClick}
      />
    </div>
  )
}

export default BreedButton;
