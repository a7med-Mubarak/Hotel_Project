import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({ logindata, children }) {

    // التحقق من وجود token أو logindata
    if (localStorage.getItem("token") || logindata) {
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
}
