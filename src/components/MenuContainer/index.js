import React, { useRef } from 'react';

import ContextMenu from '../ContextMenu';

const MenuContainer = ({ children, menuItems, card, call, scryfallGetCard }) => {
  const containerRef = useRef(null);
  return (
    <div className='container p-0' ref={containerRef}>
      {children}

      <ContextMenu
        parentRef={containerRef}
        items={menuItems}
        card={card}
        call={call}
        scryfallGetCard={scryfallGetCard}
      />
    </div>
  );
};

export default MenuContainer;