import { createContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// إنشاء سياق مع قيمة افتراضية
const AuthContext = createContext(null);

interface SaveDataProps {
  children: ReactNode; // تحديد نوع children
}

export default function SaveData({ children }: SaveDataProps) {
  const [logindata, setlogindata] = useState(null);

  const saveDataLogin = () => {
    const token = localStorage.getItem("token");

    if (token) { // التحقق من أن token ليس null
      try {
        const decodedData = jwtDecode(token); // فك التشفير بعد التحقق
        console.log(decodedData);
        // setlogindata(decodedData); // حفظ البيانات المفكوكة في الحالة
      } catch (error) {
        console.error("Error decoding token", error);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  };

  return (
    <AuthContext.Provider value={{logindata,saveDataLogin}}>
      {children}
    </AuthContext.Provider>
  );
}
