import axiosAuthInstance from '../axiosAuth/axiosAuthInstance.service'
import { UserRegister } from '../../core/interfaces/authInterfaces.interface';
import axios, { AxiosError } from 'axios';


export class AuthService{


    authUserRegister = async ( user: UserRegister ) => {

        try {
            const response = await axiosAuthInstance.post('/userRegister', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            console.log('REGISTRO CORRECTO', response);
            
            return response.data
            
        } catch (error: any) {
            
            return error.response.data
            
            let errorMessage = 'Error desconocido';
            if (error.response) {
                // Acceso al cuerpo de la respuesta de error
                console.log(error.response.data); // Datos del error devueltos por el servidor
                console.log(error.response.status); // Código de estado HTTP
                console.log(error.response.headers); // Cabeceras de la respuesta
            }

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                errorMessage = axiosError.response?.statusText || 'Error en la solicitud';
            }

            console.error('Error en registro:', errorMessage);
            
            return {
                status: false,
                message: errorMessage,
            };
        }

    }


}