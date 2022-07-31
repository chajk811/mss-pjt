import React, { useState } from 'react'
import './MainContainer.css'
import CharacterList from '../components/CharacterList'

const MainContainer = () => {
  const [filters, setfilters] = useState({
    alive: false,
    female: false,
    noTvSerises: false
  })

  const toggleFilter = (flag) => {
    setfilters({
      ...filters,
      [flag]: !filters[flag]
    })
  }

  return <div className='container'>
    <div className='main'>
      <button className='top-btn'>top</button>
      <div className='title'>000 과제</div>
      <div className='filter-wrapper'>
        <button className={filters.alive ? 'active' : ''} onClick={e => toggleFilter('alive')}>생존인물만</button>
        <button className={filters.female ? 'active' : ''} onClick={e => toggleFilter('female')}>여자</button>
        <button className={filters.noTvSerises ? 'active' : ''} onClick={e => toggleFilter('noTvSerises')}>tvSeries 없음</button>
        <button>초기화</button>
      </div>
      <CharacterList filters={filters} />
    </div>
  </div>
}

export default MainContainer
