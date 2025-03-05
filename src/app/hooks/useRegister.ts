import { useState } from 'react'
import { onRegister } from '../utils/services';
import { showAlert } from '../utils/showAlerts';

interface Form {
    firstname: string;
    lastname: string;
}

interface Props {
    form: Form;
    errors: any;
}
export const useRegister = (props: Props) => {
    const [registerData, setRegisterData] = useState(props);

    function onChange(e: any) {
        const { name, value } = e.target;
        setRegisterData(r => ({ ...r, form: { ...r.form, [name]: value } }));
    }

    function onSubmit() {
        onRegister(registerData.form).then((response) => {
            showAlert({
                title: 'Excelente',
                text: 'Tarjeta generada con exito N de tarjeta: ' + response.data.number + ' Pin: ' + response.data.pin,
                icon: 'success'
            });
        }).catch(({ response }) => {
            if (response.status == 400) {
                setRegisterData(r => ({ ...r, errors: response.data }));
            }
        });
    }
    return {
        registerData,
        setRegisterData,
        onChange,
        onSubmit
    }
}
