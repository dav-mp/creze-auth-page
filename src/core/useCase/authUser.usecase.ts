import { AuthService } from '../../services/authService/authService.service';
import { UserRegister } from '../interfaces/authInterfaces.interface';



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
    
            console.log('newUser', newUser);
            
            return newUser

        } catch (error) {
            throw Error('Error al crear usuario.')
        }


    }

    private isUserRegister = (obj: UserRegister): obj is UserRegister => {
        return (
            typeof obj.email === "string" &&
            typeof obj.password === "string" &&
            typeof obj.name === "string"
        );
    }


}