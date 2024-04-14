import { useContext, createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    console.log('active useff context', storedUser);
    if (storedUser) {
      setActiveUser(JSON.parse(storedUser));
    }
  }, []);

  const login = userData => {
    setActiveUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData))
  };

  // useEffect(() => {
  //   window.localStorage.setItem('user', JSON.stringify(activeUser));
  //   console.log('active login context', activeUser);
  // }, [activeUser]);

  return (
    <UserContext.Provider value={{ activeUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
