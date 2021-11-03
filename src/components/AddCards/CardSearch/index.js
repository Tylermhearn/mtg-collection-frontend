import React, { useState } from "react";
import { useAsyncOp } from 'use-async-ops'
import * as asyncOpNames from '../../../constants/asyncOpNames'
import { Button, Row } from "reactstrap";

import './index.scss'

const CardSearch = ({ process }) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const { call } = useAsyncOp({ name: asyncOpNames.SCRYFALL_AUTOCOMPLETE })

  const onChange = e => {
    call(e.currentTarget.value).then((response) => {
      setFiltered(response.data);
    })
    setActive(0);
    setIsShow(true);
    setInput(e.currentTarget.value)
  };
  const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
      if (isShow) {
        setIsShow(false);
        setInput(filtered[active])
        setActive(0);
      } else {
        process(input)
      }
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete ml-2">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return <></>;
  }
  return (
    <>
      <Row className='ml-1'>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
        <Button className='search-button ml-4' onClick={() => process(input)}>Search</Button>
      </Row>
      <div className="suggestions">
        {renderAutocomplete()}
      </div>
    </>
  );
}
export default CardSearch;