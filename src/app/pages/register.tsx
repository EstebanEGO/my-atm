import { Button } from '../components/button';
import { useRegister } from '../hooks/useRegister';

export const Register = (props: { setShowRegister: any }) => {
    const {
        registerData,
        onChange,
        onSubmit
    } = useRegister({
        form: {
            firstname: '',
            lastname: ''
        },
        errors: {}
    });

    const { form, errors } = registerData;
    return (
        <div>
            <div>
                <label htmlFor="numer">Nombre:</label>
                <input
                    value={form.firstname}
                    onChange={onChange}
                    type="text" name="firstname" className="rounded-md w-full border-2 p-1.5 border-fuchsia-500 focus:outline-none" />
                {
                    errors.firstname &&
                    <small className='text-red-500'>{errors.firstname}</small>
                }
            </div>
            <div>
                <label htmlFor="pin">Apellidos:</label>
                <input
                    onChange={onChange}
                    value={form.lastname}
                    type="text" name="lastname" className="rounded-md w-full border-2 p-1.5 border-fuchsia-500 focus:outline-none" />
                {
                    errors.lastname &&
                    <small className='text-red-500'>{errors.lastname}</small>
                }
            </div>

            <div className='mt-2'>
                <Button
                    className="mr-2"
                    text="Registrarse"
                    onClick={onSubmit} />
                <Button
                    text="Regresar"
                    onClick={() => props.setShowRegister(false)} />
            </div>
        </div>
    )
}
