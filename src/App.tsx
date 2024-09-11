import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';

import './App.css';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import { useState } from 'react';
import { validateLogin } from './utils/validate';
import Login from './pages/Login';
import Search from './pages/Search';

function App() {
  const [errorMsg, setErrorMsg] = useState<string[]>([])
  
  const isValidLogin = (name: string) => {
    const errors = validateLogin(name)
    

    setErrorMsg(errors);

    return errors.length === 0;
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={<Login  errorMsg={errorMsg} isValidLogin={isValidLogin} />} />
          <Route path='/search' element={ <Search /> } />
          <Route path='/album/:id' element={ <Album /> } />
          <Route path='/favorites' element={ <Favorites /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/profile/edit' element={<ProfileEdit />} />
        </Route>
        <Route path='/*' element={ <NotFound /> } />
      </Routes>
    </div>
  )
}

export default App
