import { UserRegister } from "../../core/interfaces/authInterfaces.interface";
import { AuthUserUseCase } from "../../core/useCase/authUser.usecase";
import { AuthService } from "../../services/authService/authService.service";


const authService = new AuthService()
const authUserUseCase = new AuthUserUseCase( authService )

export const AuthLoginApplication = async ( user: UserRegister ) => {
  try {
    return await authUserUseCase.userRegister( user )
  } catch (error) {
    throw new Error('Error al crear usuario.');
  }
};