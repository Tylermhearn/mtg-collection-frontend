import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

import './index.scss'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className='navbar' expand='md'>
      <NavbarBrand href='/collection'><img className='mr-2' src="../images/Planeswalker.png" width="25" height="30" alt="Planeswalker Symbol" /></NavbarBrand>
      <NavbarBrand href='/collection/add'>Add Cards To Collection</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar></Collapse>
    </Navbar>
  );
};

export default NavigationBar;
