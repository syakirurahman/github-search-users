import AppLayout from './layouts/app-layout/AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/search/Search';
import Favourite from './pages/favourite/Favourite';
import User from './pages/user/User';

function App() {
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            <Route element={<Search />} path="/" />
            <Route element={<Search />} path="/search" />
            <Route element={<Favourite />} path="/favourite" />
            <Route element={<User />} path="/user/:username">
            </Route>
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
