import React from "react";
import { Container, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import './index.scss'

const Info = () => {

  let history = useHistory();

  return (
    <Container className='mt-4'>
      <div className='info-container'>
        Thank you for visiting my website. This website is in its early stages and is a work in progress.
        <br />
        <hr />
        <div className='info'>
          Features to fix / Coming soon:
          <br />
          <br />
          Bulk Add cards
          <br />
          Remove cards
          <br />
          Fix JWT expiry issue
          <br />
          More basic table functionality
        </div>
        <Button onClick={() => history.push('/collection')}>To Collection</Button>
      </div>
    </Container>
  )
}

export default Info