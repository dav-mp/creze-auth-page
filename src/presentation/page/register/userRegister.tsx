import { Button } from '@mui/material'
import { AuthLoginApplication } from '../../../application/authUser/authUser.application'

const UserRegister = () => {


    const sendUserRegister = async () => {
      
        const user = {
            email: "davidmayopacheco@gmail.com",
            password: "TestPassword123!",
            name: "David"
        }

        const newUser = await AuthLoginApplication( user )

        console.log('REACT USER', newUser);
        

    }

    return (
        <div>
            <Button variant='contained' color='primary' onClick={sendUserRegister}>
                REGISTRAR

            </Button>
        </div>
    )
}

export default UserRegister