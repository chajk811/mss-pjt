import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { getCharacters } from '../api/character/CharacterApi'

const CharacterList = () => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const _page = Number(queryParams.page) || 1

  const [characters, setCharacters] = useState([])
  const [lastElement, setLastElement] = useState(null)
  const [page, setPage] = useState(_page)

  console.log(lastElement, setLastElement)

  const moreCharacters = () => {
    getCharacters(page)
      .then(res => {
        const { data } = res
        setCharacters(characters.concat(data))
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

  useEffect(() => {
    moreCharacters()
  }, [page])

  useEffect(() => {
    let observer

    if (lastElement) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
      observer.observe(lastElement)
    }
    return () => observer && observer.disconnect()
  }, [lastElement])

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
