import { useEffect, useState } from "react";
import { isCustomer } from "../utils/session";

export const useHome = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(isCustomer());
    }, []);
    return {
        showRegister,
        isAuth,
        setShowRegister,
        setIsAuth
    }
}
