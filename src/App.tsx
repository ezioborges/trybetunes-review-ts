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
import { useState } from 'react';

function App() {
  const [errorMsg, setErrorMsg] = useState<string[]>([])
  
  const isValidLogin = (name: string) => {
    const errors: string[] = []
    
    if (name.length < 3) errors.push('O campo de login deve ter no minimo 3 caracteres.');

    setErrorMsg(errors);

    return errors.length === 0;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={<Login  errorMsg={errorMsg} isValidLogin={isValidLogin} />} />
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
