import {IoCartOutline} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const {cartList} = props
  return (
    <nav>
      <h1 className="logo-heading">UNI Resto Cafe</h1>
      <ul className="nav-items-list">
        <li className="nav-item">My Orders</li>
        <li className="cart-count">
          <IoCartOutline size={30} />
          <span className="items-count">{cartList.length}</span>
        </li>
      </ul>
    </nav>
  )
}

export default Header
