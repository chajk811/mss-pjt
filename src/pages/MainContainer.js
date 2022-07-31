import React, { useState } from 'react'
import './MainContainer.css'
import CharacterList from '../components/CharacterList'

const MainContainer = () => {
  const [reset, setReset] = useState(false)
  const [filters, setFilters] = useState({
    alive: false,
    female: false,
    noTvSerises: false
  })

  const toggleFilter = (flag) => {
    setFilters({
      ...filters,
      [flag]: !filters[flag]
    })
  }

  const resetFilter = () => {
    setReset(true)
    setFilters({
      alive: false,
      female: false,
      noTvSerises: false
    })
  }

  const changeResetState = (value) => {
    setReset(value)
  }

  return <div className='container'>
    <div className='main'>
      {/* <button className='top-btn'>top</button> */}
      <div className='title'>MSS 과제</div>
      <div className='filter-wrapper'>
        <button className={filters.alive ? 'active' : ''} onClick={e => toggleFilter('alive')}>생존인물만</button>
        <button className={filters.female ? 'active' : ''} onClick={e => toggleFilter('female')}>여자</button>
        <button className={filters.noTvSerises ? 'active' : ''} onClick={e => toggleFilter('noTvSerises')}>tvSeries 없음</button>
        <button onClick={resetFilter}>초기화</button>
      </div>
      <CharacterList filters={filters} reset={reset} changeResetState={changeResetState} />
    </div>
  </div>
}

export default MainContainer
