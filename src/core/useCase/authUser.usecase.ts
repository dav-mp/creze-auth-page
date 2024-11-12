import { AuthService } from '../../services/authService/authService.service';
import { UserConfirm, UserLogin, UserRegister } from '../interfaces/authInterfaces.interface';



export class AuthUserUseCase{


    constructor(
        private readonly authService: AuthService
    ){}


    userRegister = async ( user: UserRegister ) => {

        if (!this.isUserRegister( user )) {
            throw Error('Datos de usuario no validos.')
        }

        try {
            
            const newUser = await this.authService.authUserRegister( user )
    
            return newUser

        } catch (error) {
            
            return Promise.reject(error)
        }


    }

    userConfirm = async ( user: UserConfirm ) => {
        
        if (!this.isUserConfirm( user )) {
            throw Error('Datos de usuario no validos.')
        }

        try {
            
            const userConfirm = await this.authService.authUserConfirm( user )
    
            console.log('userConfirm', userConfirm);
            
            return userConfirm

        } catch (error) {
            return Promise.reject(error)
        }

    }

    authUserLogin = async ( user: UserLogin ) => {
        
        if (!this.isUserLogin( user )) {
            throw Error('Datos de usuario no validos.')
        }

        try {
            
            const userConfirm = await this.authService.authUserLogin( user )
    
            console.log('userConfirm', userConfirm);
            
            return userConfirm

        } catch (error) {
            return Promise.reject(error)
        }

    }

    private isUserLogin = ( obj: UserLogin ): obj is UserLogin => {
        return (
            typeof obj.email === "string" &&
            typeof obj.password === "string" 
        );
    }

    private isUserConfirm = ( obj: UserConfirm ): obj is UserConfirm => {
        return (
            typeof obj.email === "string" &&
            typeof obj.confirmationCode === "string" 
        );
    }

    private isUserRegister = (obj: UserRegister): obj is UserRegister => {
        return (
            typeof obj.email === "string" &&
            typeof obj.password === "string" &&
            typeof obj.name === "string"
        );
    }


}