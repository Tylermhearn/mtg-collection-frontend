import React, { useState } from "react";
import { Container, Row, Col, ButtonGroup } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import './index.scss'

const test = (card, setModal, setCardDetails) => {
  setModal(true)
  setCardDetails(card)
}

// const ManaCost = ({ mana_cost }) => {
//   console.log()
//   return (
//     <img src={"/images/" + mana_cost + ".svg"} width="20" height="20" alt='black' />
//   )
// }

const MapCardImages = ({ card, setModal, setCardDetails }) =>
  <div className='card'>
    <div>
      <img src={card.image_uris.normal} alt="Logo" className='photo' />
    </div>
    <div className='add-button'>
      <Button size="sm" onClick={() => test(card, setModal, setCardDetails)} >+</Button>
    </div>
  </div>



const CardDisplay = ({ process, cardDisplay, modal, setModal }) => {
  const [cardDetails, setCardDetails] = useState({})
  const [foil, setFoil] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <Container className='card-display-container' fluid={true}>
      <hr className='my-4' />
      {cardDisplay.map((card) => (
        <MapCardImages key={card.id} card={card} process={process} setModal={setModal} setCardDetails={setCardDetails} />
      ))}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>{cardDetails.name} {cardDetails.mana_cost}</ModalHeader>
        <ModalBody>
          {cardDetails.oracle_text}
          <br /><hr />
          {cardDetails.set_name} | {cardDetails.set}
        </ModalBody>
        <ModalFooter>
          <Row className='mr-4'>
            <Col className='mr-4' sm='2'>
              <input className='quantity' type="text" value={quantity} placeholder="1" onChange={() => setQuantity()} />
            </Col>
            <Col className='ml-4'>
              <ButtonGroup>
                <Button className='footer-btns' onClick={() => setFoil(!foil)}>{foil ? 'Foil' : 'Not Foil'}</Button>
                <Button className='footer-btns' onClick={() => process({ ...cardDetails, foil, quantity })}>Add Card</Button>
                <Button className='footer-btns' onClick={() => setModal(!modal)}>Cancel</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default CardDisplay
