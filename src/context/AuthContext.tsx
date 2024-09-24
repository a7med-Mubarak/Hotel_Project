// import jwtDecode from 'jwt-decode';
// import React, { createContext, useState, ReactNode } from 'react';

// // Define the types for the login data and the context
// interface AuthContextType {
//     loginData: any | null;
//     saveLoginData: (data: string) => void;
//     clearLoginData: () => void; // Add clearLoginData to the context type
// }

// // Create the context with default values
// export const AuthContext = createContext<AuthContextType>({
//     loginData: null,
//     saveLoginData: () => {},
//     clearLoginData: () => {}, // Default empty function for initialization
// });

// interface AuthContextProviderProps {
//     children: ReactNode;
// }

// const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
//     const [loginData, setLoginData] = useState<any | null>(null);

//     const saveLoginData = (data: string) => {
//         let encodedToken = localStorage.getItem("token");
//         if (encodedToken) {
//             let decodedToken = jwtDecode(encodedToken);
//             setLoginData(decodedToken);
//         }
//     };

//     const clearLoginData = () => {
//         setLoginData(null); // Clear the login data when logging out
//     };

//     return (
//         <AuthContext.Provider value={{ loginData, saveLoginData, clearLoginData }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContextProvider;


import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, ReactNode } from 'react';

// Define the types for the login data and the context
interface AuthContextType {
    loginData: any | null;
    saveLoginData: (data: string) => void;
    clearLoginData: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
    loginData: null,
    saveLoginData: () => {},
    clearLoginData: () => {},
});

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [loginData, setLoginData] = useState<any | null>(null);

    const saveLoginData = (data: string) => {
        let encodedToken = localStorage.getItem("token");
        if (encodedToken) {
            let decodedToken = jwtDecode(encodedToken); // استخدام jwtDecode بشكل صحيح
            setLoginData(decodedToken);
        }
    };

    const clearLoginData = () => {
        setLoginData(null); // Clear the login data when logging out
    };

    return (
        <AuthContext.Provider value={{ loginData, saveLoginData, clearLoginData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
