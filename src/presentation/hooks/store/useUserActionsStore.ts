import { addUserToken, addUserSecretCode, addUserSession } from "../../../redux/userSlice";
import { dispatchApp, selectorApp } from "./storeHook";

type AddUserParams = {
	token?: string;
	secretCode?: string
	session? : string
};

interface UserState {
    user: AddUserParams;
}

export const useUserActions = () => {
	const dispatch = dispatchApp();

	const getTokenAction = (): string | null => {
		const user = selectorApp((state: UserState) => state.user);
		return user.token || null;
	};

	const addUserTokenAction = ({ token = '' }: AddUserParams): void => {
		dispatch(addUserToken({ token }));
	};

	const getSecretCodeAction = (): string => {
		const user = selectorApp((state: UserState) => state.user);
		return user.secretCode || '';
	};

	const addUserSecretCodeAction = ({ secretCode = '' }: AddUserParams): void => {
		dispatch(addUserSecretCode({ secretCode }));
	};

	const getUserSessionAction = (): string => {
		const user = selectorApp((state: UserState) => state.user);
		return user.session || '';
	};

	const addUserSessionAction = ({ session = '' }: AddUserParams): void => {
		dispatch(addUserSession({ session }));
	};

	return { 
		addUserTokenAction, 
		getTokenAction,
		getSecretCodeAction,
		addUserSecretCodeAction,
		getUserSessionAction,
		addUserSessionAction,
	};
};
