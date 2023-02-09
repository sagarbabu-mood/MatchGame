import './index.css'

const TabItem = props => {
  const {eachTab, isActive, onActiveTab} = props
  const {tabId, displayText} = eachTab
  const getClassName = isActive ? 'change-color' : ''

  const changeTab = () => {
    onActiveTab(tabId)
  }
  return (
    <li>
      <button
        onClick={changeTab}
        className={`tab-item ${getClassName}`}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
