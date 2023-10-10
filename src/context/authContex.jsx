import { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes from 'prop-types';

const MY_AUTH_PRADODENTAL = 'MY_AUTH_PRADODENTAL';
const ROLES_STORAGE_KEY_HIVIMAR = 'ROLES';
const KEY_JWT_PRADODENTAL = 'KEY_JWT_PRADODENTAL';
const USER_ID_PRADODENTAL = 'USER_ID_PRADODENTAL';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        window.localStorage.getItem(MY_AUTH_PRADODENTAL)
    );

    const [role, setRole] = useState(() =>
        window.localStorage.getItem(ROLES_STORAGE_KEY_HIVIMAR)
    );

    const [jwt, setJwt] = useState(() =>
        window.localStorage.getItem(KEY_JWT_PRADODENTAL)
    );

    const [id, setId] = useState(() =>
        window.localStorage.getItem(USER_ID_PRADODENTAL)
    );

    const login = useCallback((userRole) => {
        window.localStorage.setItem(MY_AUTH_PRADODENTAL, true);
        window.localStorage.setItem(ROLES_STORAGE_KEY_HIVIMAR, userRole);
        setIsAuthenticated(true);
        setRole(userRole);
    }, []);

    const logout = useCallback(() => {
        window.localStorage.removeItem(MY_AUTH_PRADODENTAL);
        window.localStorage.removeItem(ROLES_STORAGE_KEY_HIVIMAR);
        window.localStorage.removeItem(KEY_JWT_PRADODENTAL);
        window.localStorage.removeItem(USER_ID_PRADODENTAL);
        setIsAuthenticated(false);
        setRole('');
        setJwt('');
    }, []);
    const setAuthToken = useCallback((token) => {
        window.localStorage.setItem(KEY_JWT_PRADODENTAL, token);
        setJwt(token)
    }, []);

    const setUserId = useCallback((id) => {
        window.localStorage.setItem(USER_ID_PRADODENTAL, id);
        setId(id)
    }, []);

    const value = useMemo(
        () => ({
            login,
            logout,
            isAuthenticated,
            role,
            jwt,
            setAuthToken,
            setUserId,
            id,
        }),
        [isAuthenticated, login, logout, role, jwt, setAuthToken, id, setUserId]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
  };

  export function useAuthContext() {
    return useContext(AuthContext);
  }