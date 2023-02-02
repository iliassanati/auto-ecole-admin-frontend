import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import LoginScreen from './screens/LoginScreen';
import UtilisateursScreen from './screens/UtilisateursScreen';
import NewsScreen from './screens/NewsScreen';
import DashboardScreen from './screens/DahboardScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';

const App = () => {
  return (
    <Router>
      <ToastProvider autoDismissTimeout='5000'>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/admin/dashboard' element={<DashboardScreen />} />
          <Route
            path='/admin/utilisateurs'
            element={<UtilisateursScreen />}
            exact
          />
          <Route path='/admin/news' element={<NewsScreen />} exact />
          <Route
            path='/admin/utilisateurs/:idUtilisateur'
            element={<UserDetailsScreen />}
            exact
          />
        </Routes>
      </ToastProvider>
    </Router>
  );
};

export default App;
