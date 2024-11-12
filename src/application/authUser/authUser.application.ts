import { UserConfirm, UserLogin, UserRegister } from "../../core/interfaces/authInterfaces.interface";
import { AuthUserUseCase } from "../../core/useCase/authUser.usecase";
import { AuthService } from "../../services/authService/authService.service";


const authService = new AuthService()
const authUserUseCase = new AuthUserUseCase( authService )

export const AuthRegisterApplication = async ( user: UserRegister ) => {
  try {
    return await authUserUseCase.userRegister( user )
  } catch (error) {
    throw new Error('Error al crear usuario.');
  }
};

export const UserConfirmApplication = async ( user: UserConfirm ) => {
  try {
    return await authUserUseCase.userConfirm( user )
  } catch (error) {
    throw new Error('Error al crear usuario.');
  }
}

export const UserLoginApplication = async ( user: UserLogin ) => {
  try {
    return await authUserUseCase.authUserLogin( user )
  } catch (error) {
    throw new Error('Error al crear usuario.');
  }
}