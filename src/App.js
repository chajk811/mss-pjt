import React from 'react'
import { isMobile } from 'react-device-detect'
import MainContainer from './pages/MainContainer'

function App () {
  // check mobile device
  const renderContent = () => {
    if (!isMobile) {
      return <div> This content is available only on mobile</div>
    }
    return <MainContainer/>
  }

  return renderContent()
}

export default App
