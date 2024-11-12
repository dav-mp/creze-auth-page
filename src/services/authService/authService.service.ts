import axiosAuthInstance from '../axiosAuth/axiosAuthInstance.service'
import { UserConfirm, UserLogin, UserRegister } from '../../core/interfaces/authInterfaces.interface';
// import axios, { AxiosError } from 'axios';


export class AuthService{


    authUserRegister = async ( user: UserRegister ) => {

        try {
            const response = await axiosAuthInstance.post('/userRegister', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            return {data: response.data, error: false}
            
        } catch (error: any) {

            if( error.code === "ERR_NETWORK") {

                return Promise.reject(
                    {
                        error: 'service not available'
                    }
                )
            }
            return Promise.reject(error.response.data)
            // if( error.code === 400) {


            //     return {
            //         error: 'service not available'
            //     }
            // }
            // console.log(error);
            
            // return error.response.data
            
            // let errorMessage = 'Error desconocido';
            // if (error.response) {
            //     // Acceso al cuerpo de la respuesta de error
            //     console.log(error.response.data); // Datos del error devueltos por el servidor
            //     console.log(error.response.status); // Código de estado HTTP
            //     console.log(error.response.headers); // Cabeceras de la respuesta
            // }

            // if (axios.isAxiosError(error)) {
            //     const axiosError = error as AxiosError;
            //     errorMessage = axiosError.response?.statusText || 'Error en la solicitud';
            // }

            // console.error('Error en registro:', errorMessage);
            
            // return {
            //     status: false,
            //     message: errorMessage,
            // };
        }

    }

    authUserConfirm = async ( user: UserConfirm ) => {

        try {
            const response = await axiosAuthInstance.post('/userConfirm', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            console.log('CONFIRM CORRECTO', response);
            
            return response.data
            
        } catch (error: any) {
            
            return error.response.data

        }
      
    }

    authUserLogin = async ( user: UserLogin ) => {

        try {
            const response = await axiosAuthInstance.post('/userLogin', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            console.log('CONFIRM CORRECTO', response);
            
            return response.data
            
        } catch (error: any) {
            
            return error.response.data

        }
      
    }


}