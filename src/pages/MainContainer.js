import React from 'react'
import './MainContainer.css'

const MainContainer = () => {
  return <div className='container'>
    <div className='main'>
      <button className='top-btn'>top</button>
      <div className='title'>무신사 과제</div>
      <div className='filter-wrapper'>
        <button className='active'>생존인물만</button>
        <button>여자</button>
        <button>tvSeries 없음</button>
        <button>초기화</button>
      </div>
      <div className='content-wrapper'>
        <div className='content'></div>
        <div className='content'></div>
        <div className='content'></div>
        <div className='content'></div>
        <div className='content'></div>
      </div>
    </div>
  </div>
}

export default MainContainer
