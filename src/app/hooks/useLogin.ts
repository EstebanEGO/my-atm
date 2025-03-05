import { useState } from "react";
import { onLogin } from "../utils/services";
import { setUser } from "../utils/session";
import { showAlert } from "../utils/showAlerts";

interface Form {
    number: string
    pin: string
}
interface Props {
    form: Form;
    errors: any;
}
export const useLogin = (props: Props, setIsAuth: any) => {
    const [loginData, setLoginData] = useState(props);
    
    function onChange(e: any) {
        const { name, value } = e.target;
        setLoginData(l => ({...l, form: {...l.form, [name]: value}}));
    }

    function onSubmit() {
        onLogin(loginData.form).then((response) => {
            if (response.data) {
                setUser(response.data);
                setIsAuth(true);
            }
        }).catch(({response}) => {
            if (response.status == 400) {
                setLoginData(l => ({...l, errors: response.data}));
            }
            if (response.status == 404) {
                showAlert({title: 'Upps', text: 'Tarjeta o pin incorrecto', 'icon': 'warning'});
            }
            console.log(response)
        });
    }

    return {
        loginData,
        setLoginData,
        onChange,
        onSubmit
    }
}
