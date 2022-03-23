import { User } from '../user/user.store'
import { BASE_URL2, BASE_REQUEST } from './../../utils/base.api'

const FavouriteApi: any = {
  getLikedUsers: () => 
    BASE_REQUEST.get(`${BASE_URL2}/get`),
  likeUser: (user: User) => 
    BASE_REQUEST.post(`${BASE_URL2}/post`, user),
  unLikeUser: (user: User) => 
    BASE_REQUEST.delete(`${BASE_URL2}/delete`, user)

}

export default FavouriteApi