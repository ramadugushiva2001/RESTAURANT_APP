import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from './Component/Header'
import ProductItem from './Component/ProductItem'
import CategoryItems from './Component/CategoryItems'

import './App.css'

class App extends Component {
  state = {
    restaurantData: [],
    activeCategory: 'Salads and Soup',
    cartList: [],
    count: 0,
    categoriesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  getData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e',
    )
    if (response.ok) {
      const data = await response.json()

      const categoriesList = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
      }))

      this.setState({
        restaurantData: this.getUpdatedData(data[0].table_menu_list),
        categoriesList,
        isLoading: false,
      })
    }
  }

  setActiveCategory = id => {
    this.setState({activeCategory: id})
  }

  removeItemFromCart = dish => {
    const {cartList} = this.state
    const isItemExists = cartList.find(each => each.dishId === dish.dishId)
    if (isItemExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(each =>
            each.dishId === dish.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  getFilteredData = () => {
    const {restaurantData, activeCategory} = this.state

    const filteredData = restaurantData.filter(
      each => each.menuCategory === activeCategory,
    )
    return filteredData
  }

  renderDishes = () => {
    const {restaurantData, activeCategory} = this.state

    const res = restaurantData.find(
      each => each.menuCategory === activeCategory,
    )
    return res
  }

  /*  addItemToCart = dish => {
    const {cartList} = this.state
    const isItemExists = cartList.find(item => item.dishId === dish.dishId)
    if (!isItemExists) { 
      const updatedCartList = [...cartList]
      updatedCartList[existingItemIndex].quantity++
      this.setState({cartList: updatedCartList})
    } else {
      // If the dish is not in the cart, add it with quantity 1
      const newDish = {dishId, quantity: 1}
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newDish],
      }))
    }
  } */

  addItemToCart = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(each => each.dishId === dish.dishId)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00ff00" height={50} width={50} />
    </div>
  )

  render() {
    const filteredData = this.getFilteredData()

    const {categoriesList, activeCategory, cartList, isLoading} = this.state

    return (
      <div>
        <Header cartList={cartList} />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            <ul className="categories-list">
              {categoriesList.map(each => (
                <CategoryItems
                  category={each.menuCategory}
                  key={each.menuCategoryId}
                  isActive={activeCategory === each.menuCategory}
                  setActiveCategory={this.setActiveCategory}
                />
              ))}
            </ul>
            <ul className="dishes-container">
              {filteredData.map(each =>
                each.categoryDishes.map(dish => (
                  <ProductItem
                    addItemToCart={this.addItemToCart}
                    dish={dish}
                    cartList={cartList}
                    activeCategory={activeCategory}
                    removeItemFromCart={this.removeItemFromCart}
                  />
                )),
              )}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default App

/*    const updatedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nexturl: each.nexturl,
        categoryDishes: each.category_dishes.map(dish => ({
          dishId: dish.dish_id,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          dishImage: dish.dish_image,
          dishCurrency: dish.dish_currency,
          dishCalories: dish.dish_calories,
          dishDescription: dish.dish_description,
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          nexturl: dish.nexturl,
          addonCat: dish.addonCat,
        })),
      }))
      */
