import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Layout from './page/Layout';

import './App.css';
import Search from './page/Search';
import NotFound from './page/NotFound';
import Album from './page/Album';
import Favorites from './page/Favorites';
import Profile from './page/Profile';
import ProfileEdit from './page/ProfileEdit';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Login /> } />
          <Route path='/search' element={ <Search /> } />
          <Route path='/album/:id' element={ <Album /> } />
          <Route path='/favorites' element={ <Favorites /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/profile/edit' element={ <ProfileEdit /> } />
        </Route>
        <Route path='/*' element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
