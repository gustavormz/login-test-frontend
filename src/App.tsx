import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import NotFoundView from './views/NotFound'

import { PATHS } from './constants'

const App = () => {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Router>
        <Routes>
          <Route path={PATHS['/login']} element={<LoginView />} />
          <Route path={PATHS['/profile']} element={<ProfileView />} />
          <Route path={PATHS['/register']} element={<RegisterView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
