import React from 'react';
import { Button, ButtonGroup, Row } from 'reactstrap';

import { useInput } from './useInput';
import './index.scss'

const colors = ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless']
const cardTypes = ['Artifact', 'Instant', 'Creature', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker']

const FilterBox = ({ filter, setFilter, setSearch, setShowPrices, showPrices }) => {

  const { bind } = useInput('', setSearch);

  const onCheckboxBtnClick = (selected) => {
    const index = filter.indexOf(selected);
    if (index < 0) {
      filter.push(selected);
    } else {
      filter.splice(index, 1);
    }
    setFilter([...filter]);
  }

  const FilterButton = ({ type }) => {
    return (
      <Button className='shadow-none card-table-btn' onClick={() => onCheckboxBtnClick(type)} active={filter.includes(type)}>
        <img src={"./images/" + type + ".png"} width="25" height="25" alt={type} /></Button>
    )
  }

  return (
    <>
      <Row>
        <ButtonGroup >
          {colors.map((type) => (
            <FilterButton key={type} type={type} />
          ))}
        </ButtonGroup>
        <ButtonGroup className='pl-4'>
          {cardTypes.map((type) => (
            <FilterButton key={type} type={type} />
          ))}
        </ButtonGroup>
        <ButtonGroup className='pl-4'>
          <Button className='shadow-none foil' onClick={() => onCheckboxBtnClick("foil")} active={filter.includes("foil")}>Foil</Button>
        </ButtonGroup>
        <form className='form'>
          <input className='form-input pl-2 ml-4' type="text" {...bind} placeholder="Search By Card Name" />
        </form>
      </Row>
      <Row>
        <ButtonGroup className='pt-2'>
          {showPrices
            ? <Button className='shadow-none foil' onClick={() => setShowPrices(false)} active={true} >Hide Prices</Button>
            : <Button className='shadow-none foil' onClick={() => setShowPrices(true)} active={true} >Show Prices</Button>
          }
        </ButtonGroup>
      </Row>
    </>
  );
}

export default FilterBox