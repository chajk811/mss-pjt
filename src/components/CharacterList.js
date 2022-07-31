import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { getCharacters } from '../api/character/CharacterApi'

const CharacterList = ({ filters }) => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const _page = Number(queryParams.page) || 1

  const [characters, setCharacters] = useState([])
  const [originList, setOriginList] = useState([])
  const [lastElement, setLastElement] = useState(null)
  const [page, setPage] = useState(_page)

  // [TODO] filter on & fetchData 시, 필터링 적용
  // [TODO] 삭제 버튼 기능 추가
  // [TODO] 초기화 버튼 클릭 시, deleted data originList 로 초기화

  const fetchData = () => {
    getCharacters(page)
      .then(res => {
        const { data } = res
        setCharacters(characters.concat(data))
        setOriginList(originList.concat(data)) // save origin list data
      })
      .catch(error => console.log('error: ', error))
  }

  const onIntersect = (entries, observer) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        setPage((prev) => prev + 1)
        observer.unobserve(el.target)
      }
    })
  }

  const filterData = () => {
    let tmpData = originList // [TODO] 삭제한 데이터가 있는 경우, deleted data 불러오기

    Object.entries(filters).forEach(([key, value]) => {
      switch (value && key) {
        case 'alive':
          tmpData = tmpData.filter(v => v.isAlive)
          break
        case 'female':
          tmpData = tmpData.filter(v => v.gender === 'Female')
          break
        case 'noTvSerises':
          tmpData = tmpData.filter(v => v.tvSeries.filter(v => v).length === 0)
          break
      }
    })

    console.log('filtering Data: ', tmpData)
    setCharacters(tmpData)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    let observer

    if (lastElement) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
      observer.observe(lastElement)
    }
    return () => observer && observer.disconnect()
  }, [lastElement])

  useEffect(() => {
    // filter btn 이 눌린 경우, 필터링
    filterData()
  }, [filters])

  return <div className='card-wrapper'>
    {characters.map((character, idx) => {
      if (idx === characters.length - 1) {
        return (
          <div className='card' key={idx} ref={setLastElement}>
            <div className='content'>
              <p>name : {character.name || '-'}</p>
              <p>aliases : {character.aliases.join(', ') || '-'}</p>
              <p>title : {character.titles.join(', ') || '-'}</p>
              <p>books : {character.books.filter(v => v).length}</p>
              <p>tvSeries : {character.tvSeries.filter(v => v).length}</p>
            </div>
            <div className='btn-area'>
              <button className='delete-btn'>삭제</button>
            </div>
          </div>
        )
      } else {
        return (
          <div className='card' key={idx}>
            <div className='content'>
              <p>name : {character.name || '-'}</p>
              <p>aliases : {character.aliases.join(', ') || '-'}</p>
              <p>title : {character.titles.join(', ') || '-'}</p>
              <p>books : {character.books.filter(v => v).length}</p>
              <p>tvSeries : {character.tvSeries.filter(v => v).length}</p>
            </div>
            <div className='btn-area'>
              <button className='delete-btn'>삭제</button>
            </div>
          </div>
        )
      }
    })}
  </ div>
}

export default CharacterList
