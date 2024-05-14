import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Simulating an asynchronous check for authentication status
        const checkAuthentication = () => {
            const authenticated = secureLocalStorage.getItem('accessToken') !== null && secureLocalStorage.getItem('userName') !== null;
            if(!authenticated){
                secureLocalStorage.removeItem('accessToken')
                secureLocalStorage.removeItem('userName')
            }
            setIsAuthenticated(authenticated);
        };

        checkAuthentication();
    }, []);

    return isAuthenticated;
};

export default useAuth;