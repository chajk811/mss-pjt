import apiInstance from '../api-instance'

const getCharacters = (_page) => {
  const _params = {
    page: _page,
    pageSize: 10
  }

  return apiInstance.request({
    method: 'GET',
    url: '/characters',
    params: _params
  })
}

export { getCharacters }
