import {Component} from 'react'
import {FaPlus, FaMinus} from 'react-icons/fa'

import './index.css'

const ProductItem = ({addItemToCart, removeItemFromCart, dish, cartList}) => {
  const {
    dishId,
    dishName,
    dishAvailability,
    dishCalories,
    dishType,
    dishCurrency,
    dishPrice,
    dishDescription,
    addonCat,
    dishImage,
  } = dish

  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const increaseQuantity = () => addItemToCart(dish)

  const onDecreaseQuantity = () => removeItemFromCart(dish)

  return (
    <>
      <li className="list-item" key={dishId}>
        <div className="dish-type">
          <div className={dishType === 1 ? 'veg-border' : 'non-veg-border'}>
            <div className={dishType === 1 ? 'veg' : 'non-veg'} />
          </div>
          <div className="description-container">
            <h1>{dishName}</h1>
            <p className="dish-price">
              {dishCurrency} {dishPrice}
            </p>
            <p className="dish-description">{dishDescription}</p>
            {dishAvailability ? (
              <div className="cart-button-container">
                <button className="cart-button" onClick={onDecreaseQuantity}>
                  -
                </button>
                <p className="count">{getQuantity()}</p>
                <button className="cart-button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            ) : (
              <p color="#FF0000">Not Available</p>
            )}
            {addonCat.length !== 0 && (
              <p color="#0000FF" className="add-on-cat-text">
                Customizations Available
              </p>
            )}
          </div>
        </div>
        <div className="dish-image-container">
          <p className="calaries">{dishCalories} calories</p>
          <img src={dishImage} alt={dishName} className="dish-image" />
        </div>
      </li>
    </>
  )
}

export default ProductItem
