import { addUserToken } from "../../../redux/userSlice";
import { dispatchApp, selectorApp } from "./storeHook";

type AddUserTokenParams = {
	token: string;
};

interface UserState {
    user: AddUserTokenParams;
}

export const useUserActions = () => {
	const dispatch = dispatchApp();

	const getTokenAction = (): string | null => {
		const user = selectorApp((state: UserState) => state.user);
		return user.token || null;
	};

	const addUserTokenAction = ({ token }: AddUserTokenParams): void => {
		dispatch(addUserToken({ token }));
	};

	return { 
		addUserTokenAction, 
		getTokenAction
	};
};
