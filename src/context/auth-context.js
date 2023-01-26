import React, { useState, useEffect } from 'react';

const defaultContext = {
  setAuthObject: undefined,
  authObject: undefined,
}

const AuthContext = React.createContext(defaultContext);

export const AuthContextProvider = (props) => {
  const [authObject, setAuthObject] = useState(() => {
    let obj;
    try {
      obj = JSON.parse(window.localStorage.getItem("lit_blog_jwt"))
      if (obj && obj.expiresAt < Date.now()) {
        obj = null;
      }
    }
    catch (err) {
      obj = null;
    }
    return obj;
  })

  useEffect(() => {
    console.log('use Effect Ran');
    window.localStorage.setItem("lit_blog_jwt", JSON.stringify(authObject));
  }, [authObject]);

  function checkExpire() {
    if (authObject && authObject.expiresAt < Date.now()) {
      setAuthObject(null);
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        authObject,
        setAuthObject,
        checkExpire,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;