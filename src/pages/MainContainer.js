import React from 'react'
import './MainContainer.css'
import CharacterList from '../components/CharacterList'

const MainContainer = () => {
  return <div className='container'>
    <div className='main'>
      <button className='top-btn'>top</button>
      <div className='title'>000 과제</div>
      <div className='filter-wrapper'>
        <button className='active'>생존인물만</button>
        <button>여자</button>
        <button>tvSeries 없음</button>
        <button>초기화</button>
      </div>
      <CharacterList />
    </div>
  </div>
}

export default MainContainer
