import {Component} from 'react'
import TabItem from '../TabItem'
import './index.css'

import AppItem from '../AppItem'

class Home extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      score: 0,
      time: 60,
      activeTabId: tabsList[0].tabId,
      thumbnailUrl: imagesList[0].imageUrl,
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  tick = () => {
    const {time} = this.state

    if (time > 0) {
      const newTime = time - 1
      this.setState({time: newTime})
    } else {
      clearInterval(this.intervalId)
      this.setState({isGameOver: true})
    }
  }

  getHeader = () => {
    const {score, time} = this.state
    const element = (
      <nav className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
          className="website-logo"
        />
        <div className="score-container">
          <li>
            <p>
              Score:
              <span className="score">{score}</span>
            </p>
          </li>
          <div className="timer-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer"
            />
            <li>
              <p className="score">{time} sec</p>
            </li>
          </div>
        </div>
      </nav>
    )
    return element
  }

  onActiveTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  getActiveApps = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props

    const result = imagesList.filter(
      eachApp => eachApp.category === activeTabId,
    )
    return result
  }

  onClickAppItem = clickedUrl => {
    const {imagesList} = this.props
    const {thumbnailUrl} = this.state
    const result = imagesList.filter(
      eachImage => eachImage.thumbnailUrl === clickedUrl,
    )
    console.log(
      clickedUrl,
      thumbnailUrl,
      result,
      result[0].thumbnailUrl === clickedUrl,
    )
    if (result[0].imageUrl === thumbnailUrl) {
      const randomUrl = imagesList[Math.ceil(Math.random() * imagesList.length)]
      this.setState(prevState => ({
        thumbnailUrl: randomUrl.imageUrl,
        score: prevState.score + 1,
      }))
    } else {
      clearInterval(this.intervalId)
      this.setState(prevState => ({
        isGameOver: !prevState.isGameOver,
      }))
    }
  }

  onReset = () => {
    const {tabsList, imagesList} = this.props
    this.setState({
      score: 0,
      time: 60,
      activeTabId: tabsList[0].tabId,
      thumbnailUrl: imagesList[0].imageUrl,
      isGameOver: false,
    })
    this.intervalId = setInterval(this.tick, 1000)
  }

  render() {
    const {tabsList} = this.props
    const {activeTabId, thumbnailUrl, isGameOver, score} = this.state

    const filteredTabsList = this.getActiveApps()

    return (
      <>
        <div className="home-container">
          <div>
            <ul>{this.getHeader()}</ul>
          </div>
          <div className="bg-container">
            {isGameOver ? (
              <div className="game-over-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                  className="trophy"
                />
                <p>YOUR SCORE</p>
                <p>{score}</p>
                <button
                  type="button"
                  className="play-again"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                    className="reset"
                  />
                  PLAY AGAIN
                </button>
              </div>
            ) : (
              <>
                <img src={thumbnailUrl} alt="match" />
                <ul className="tab-items-container">
                  {tabsList.map(eachTab => (
                    <TabItem
                      eachTab={eachTab}
                      key={eachTab.tabId}
                      onActiveTab={this.onActiveTab}
                      isActive={activeTabId === eachTab.tabId}
                    />
                  ))}
                </ul>
                <ul className="app-items-container">
                  {filteredTabsList.map(eachTab => (
                    <AppItem
                      eachTab={eachTab}
                      key={eachTab.id}
                      onClickAppItem={this.onClickAppItem}
                      id={eachTab.thumbnailUrl}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Home
