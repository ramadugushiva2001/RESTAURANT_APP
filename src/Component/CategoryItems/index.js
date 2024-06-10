import './index.css'

const CategoryItems = props => {
  const {category, setActiveCategory, isActive} = props

  const onClickCategory = () => {
    setActiveCategory(category)
  }

  return (
    <li>
      <button
        type="button"
        className={isActive ? 'actice-category' : 'category-button'}
        onClick={onClickCategory}
      >
        {category}
      </button>
    </li>
  )
}

export default CategoryItems
