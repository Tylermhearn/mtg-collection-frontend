import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Container } from 'reactstrap'
import { useAsyncEffect } from 'use-async-ops'

import * as asyncOpNames from '../../constants/asyncOpNames'
import { BasicTable } from "./BasicTable/BasicTable"
import Pagination from './Pagination'
import FilterBox from './Filtering'
import CardTable from "./CardTable"
import { cardSort } from './Sorting'
import { cardType } from './Filtering/Filter'
import library from "../../selectors/library"

const defaultState = ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless', 'Artifact', 'Instant', 'Creature', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker']

const getPaginatedData = (data, currentPage, cardsPerPage) => {
  const startIndex = currentPage * cardsPerPage - cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  return data.slice(startIndex, endIndex);
}

const Collection = () => {
  useAsyncEffect({ name: asyncOpNames.GET_LIBRARY })
  const cards = useSelector(library)

  const [filter, setFilter] = useState(defaultState);
  const [table, setTable] = useState('Card');
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showPrices, setShowPrices] = useState(false);

  const data = cardType(cards, filter).sort(cardSort).filter(card => card.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Container className='pb-2'>
        <Pagination data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} cardLimit={cardsPerPage} setCardsPerPage={setCardsPerPage} setTable={setTable} table={table} />
        <FilterBox filter={filter} setFilter={setFilter} setSearch={setSearch} setShowPrices={setShowPrices} showPrices={showPrices} />
      </Container>
      {table === 'Basic'
        ? <BasicTable data={getPaginatedData(data, currentPage, cardsPerPage)} />
        : <CardTable data={getPaginatedData(data, currentPage, cardsPerPage)} cardsPerPage={cardsPerPage} setCardsPerPage={setCardsPerPage} showPrices={showPrices} />}
    </div>
  );
};

export default Collection;
