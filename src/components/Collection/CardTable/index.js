import React from 'react';
import ResizeObserver from 'rc-resize-observer'
import MenuContainer from '../../MenuContainer';
import { useAsyncOp } from 'use-async-ops'
import * as serviceTypes from '../../../constants/asyncOpNames'
import './index.scss'

const priceToDisplay = (card) => {
    if (card.extras === '') {
        return (card.prices.usd)
    }
    else return card.prices.usd_foil
}


const menuItems = [
    // {
    //     text: 'Delete',
    //     onClick: (card, call) => { call(card.id) }
    // },
    {
        text: 'TCGPlayer',
        onClick: (card, call, scryfallGetCard) => {
            scryfallGetCard(card.scryfall_id)
                .then((response) => {
                    window.open(response.purchase_uris.tcgplayer, '_blank').focus()
                })
        }
    }
];

const MapCardImages = ({ card, call, showPrices, scryfallGetCard }) =>
    <div className='card'>
        <MenuContainer menuItems={menuItems} card={card} call={call} scryfallGetCard={scryfallGetCard}>
            <img src={card.imgUri} alt="Logo" className='photo' />
            {showPrices ? <div className="price">${priceToDisplay(card)}</div> : null}
        </MenuContainer>
    </div>

const CardTable = ({ data, cardsPerPage, setCardsPerPage, showPrices }) => {
    const { call } = useAsyncOp({ name: serviceTypes.DELETE_CARD })
    const { call: scryfallGetCard } = useAsyncOp({ name: serviceTypes.SCRYFALL_GET_CARD })

    return (
        <>
            <hr className="pt-4 filter" />
            <ResizeObserver
                onResize={(size) => {
                    if (parseInt(size.width / 200) * 4 !== cardsPerPage) {
                        setCardsPerPage(parseInt(size.width / 200) * 4)
                    }
                }}>
                <div className='photo-box'>
                    {data.map((card) => (
                        <MapCardImages key={card.id} card={card} call={call} showPrices={showPrices} scryfallGetCard={scryfallGetCard} />
                    ))}
                </div>
            </ResizeObserver>
        </>
    )
}

export default CardTable