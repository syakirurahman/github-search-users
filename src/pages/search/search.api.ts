import { BASE_URL, BASE_REQUEST } from './../../utils/base.api'

const SearchApi: any = {
  searchUsers: (keyword: string, page: number, size: number) => 
    BASE_REQUEST.get(`${BASE_URL}/search/users?q=${keyword}&page=${page}&per_page=${size}`)
}

export default SearchApi