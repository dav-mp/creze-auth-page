

export interface UserRegister {
    email: string;
    password: string;
    name: string;
}

export interface UserConfirm {
    email: string;
    confirmationCode: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserConfirmMFA {
    session: string;
    userCode: string;
}

export interface UserVerifyMFA {
    session: string;
    email: string;
    userCode: string;
}