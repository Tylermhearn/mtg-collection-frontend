import React, { useState, useCallback } from "react";
import { useAsyncOp } from 'use-async-ops'

import * as asyncOpNames from '../../constants/asyncOpNames'
import CardSearch from "./CardSearch"
import CardDisplay from './CardDisplay'
import './index.scss'


const AddCards = () => {
  const { call: getCardCall } = useAsyncOp({ name: asyncOpNames.SCRYFALL_GET_CARDS })
  const { call: addCardCall } = useAsyncOp({ name: asyncOpNames.POST_LIBRARY })
  const [cardDisplay, setCardDisplay] = useState([])
  const [modal, setModal] = useState(false)

  const getCardsByName = useCallback((name) => {
    getCardCall(name)
      .then((response) => {
        setCardDisplay(response.data);
      })
  }, [getCardCall]);

  const addCardToLibrary = useCallback((card) => {
    addCardCall(card)
      .then(setModal(false))
  }, [addCardCall]);

  return (
    <div className='add-card-container mt-4' >
      <CardSearch process={getCardsByName} />
      <CardDisplay process={addCardToLibrary} cardDisplay={cardDisplay} modal={modal} setModal={setModal} />
    </div>
  )
}

export default AddCards