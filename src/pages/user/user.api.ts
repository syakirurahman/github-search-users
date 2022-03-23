import { BASE_URL, BASE_REQUEST } from './../../utils/base.api'

const UserApi: any = {
  getUser: (username: string) => 
    BASE_REQUEST.get(`${BASE_URL}/users/${username}`),
  getUserFollowers: (username: string) =>
    BASE_REQUEST.get(`${BASE_URL}/users/${username}/followers`),
  getUserFollowing: (username: string) =>
    BASE_REQUEST.get(`${BASE_URL}/users/${username}/following`)

}

export default UserApi