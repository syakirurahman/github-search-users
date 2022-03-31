import { BASE_URL, BASE_REQUEST } from './../../utils/base.api'

const UserApi: any = {
  getUser: (username: string): Promise<any> => 
    BASE_REQUEST.get(`${BASE_URL}/users/${username}`),
  getUserRepositories: (username: string): Promise<any> =>
    BASE_REQUEST.get(`${BASE_URL}/users/${username}/repos`),
  getUserFollowers: (username: string): Promise<any> =>
    BASE_REQUEST.get(`${BASE_URL}/users/${username}/followers`),
  getUserFollowing: (username: string): Promise<any> =>
    BASE_REQUEST.get(`${BASE_URL}/users/${username}/following`)

}

export default UserApi