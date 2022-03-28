import AppLayout from './layouts/app-layout/AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/search/Search';
import Favourite from './pages/favourite/Favourite';
import User from './pages/user/User';
import UserRepositories from './pages/user/UserRepositories';
import UserFollowers from './pages/user/UserFollowers';
import UserFollowing from './pages/user/UserFollowing';

function App() {
  console.log(process.env)
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            <Route element={<Search />} path="/" />
            <Route element={<Search />} path="/search" />
            <Route element={<Favourite />} path="/liked" />
            <Route element={<User />} path="/user/:username">
              <Route element={<UserRepositories />} index />
              <Route element={<UserRepositories />} path="repositories" />
              <Route element={<UserFollowers />} path="followers" />
              <Route element={<UserFollowing />} path="following" />
            </Route>
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
