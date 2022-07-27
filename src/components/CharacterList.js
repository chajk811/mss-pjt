import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { getCharacters } from '../api/character/CharacterApi'

const CharacterList = () => {
  const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const page = queryParams.page || 1

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    getCharacters(page)
      .then(res => {
        const { data } = res
        setCharacters(data)
      })
      .catch(error => console.log('error: ', error))
  }, [])

  return <div className='content-wrapper'>
    {characters.map((character, idx) => (
      <div className='content' key={idx}>
        {character.gender}
      </div>
    ))}
  </ div>
}

export default CharacterList
