import React, { useState } from 'react';
import LoginForm from './Components/Login';
import {MainPage} from './Components/MainPage';
import './Styles/App.css';

const App: React.FC = () => {
  const [loginError, setLoginError] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
 
  const handleLogin = (username: string, password: string) => {
    // Replace this with your authentication logic
    if (username === 'Luke' && password === 'IAmYourFather') {
      setIsAuthenticated(true);
      setLoginError(undefined);
      // redirect to main page of the application, but need to implement routing, and authentication state management
      // but for now just going to redirect to a basic grid page for StarWarsCardInfo
      // this should be the component for StarWarsCardInfo page
    } else {
      setIsAuthenticated(false);
      setLoginError('Invalid username or password');
      // this will show an error message, and the user can try again 
    }
  };

  return isAuthenticated ?  <MainPage /> : <LoginForm onLogin={handleLogin} error={loginError} />;
};

export default App;