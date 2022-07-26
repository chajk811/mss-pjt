import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { getCharacters } from '../api/character/CharacterApi'

const CharacterList = ({ filters, reset, changeResetState }) => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const _page = Number(queryParams.page) || 1

  const [characters, setCharacters] = useState([])
  const [originList, setOriginList] = useState([])
  const [deletedList, setDeletedList] = useState([])
  const [lastElement, setLastElement] = useState(null)
  const [page, setPage] = useState(_page)

  const fetchData = () => {
    if (page > 10) return // 1 ~ 10 page 까지 호출

    getCharacters(page)
      .then(res => {
        const { data } = res
        setCharacters(characters.concat(data))
        setOriginList(originList.concat(data)) // save origin list data

        if (deletedList.length > 0) setDeletedList(deletedList.concat(data))
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
    let tmpData = deletedList.length > 0 ? deletedList : originList

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

    // console.log('filtering Data: ', tmpData)
    setCharacters(tmpData)
  }

  const deleteData = (url) => {
    setCharacters(characters.filter(v => v.url !== url))
    setDeletedList(deletedList.length > 0 ? deletedList.filter(v => v.url !== url) : originList.filter(v => v.url !== url))
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
    // fetchData 후 & filter btn 이 눌린 경우, 필터링 데이터
    filterData()
  }, [filters, originList, deletedList])

  useEffect(() => {
    // clicked reset btn
    if (reset) {
      setDeletedList([]) // reset deletedList
      changeResetState(false) // reset state => false
    }
  }, [reset])

  return <div className='card-wrapper'>
    {characters.map((character, idx) => {
      if (idx === characters.length - 1) {
        return (
          <div className='card last' key={idx} ref={setLastElement}>
            <div className='content'>
              <p>name : {character.name || '-'}</p>
              <p>aliases : {character.aliases.join(', ') || '-'}</p>
              <p>title : {character.titles.join(', ') || '-'}</p>
              <p>books : {character.books.filter(v => v).length}</p>
              <p>tvSeries : {character.tvSeries.filter(v => v).length}</p>
            </div>
            <div className='btn-area'>
              <button className='delete-btn' onClick={e => deleteData(character.url)}>삭제</button>
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
              <button className='delete-btn' onClick={e => deleteData(character.url)}>삭제</button>
            </div>
          </div>
        )
      }
    })}
    {page > 10 && <div className='end-marker'>end page</div>}
  </ div>
}

export default CharacterList
