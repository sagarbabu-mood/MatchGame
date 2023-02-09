import './index.css'

const AppItem = props => {
  const {eachTab, onClickAppItem} = props

  const {imageUrl, thumbnailUrl} = eachTab
  const selectedApp = () => {
    onClickAppItem(thumbnailUrl)
  }
  return (
    <li>
      <button type="button">
        <img
          src={thumbnailUrl}
          className="app-item"
          alt="thumbnail"
          onClick={selectedApp}
        />
      </button>
    </li>
  )
}

export default AppItem
