import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { getCharacters } from '../api/character/CharacterApi'

const CharacterList = () => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const _page = queryParams.page || 1

  const [characters, setCharacters] = useState([])
  const [page] = useState(_page)

  useEffect(() => {
    getCharacters(page)
      .then(res => {
        const { data } = res
        setCharacters(data)
      })
      .catch(error => console.log('error: ', error))
  }, [])

  return <div className='card-wrapper'>
    {characters.map((character, idx) => (
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
    ))}
  </ div>
}

export default CharacterList
