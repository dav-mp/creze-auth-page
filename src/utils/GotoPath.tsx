import { useNavigate } from 'react-router-dom';

const useNavigationUtil = () => {
    const navigate = useNavigate();

    const goTo = (path: string) => {
      navigate(path);
    };

    return { goTo };
};

export default useNavigationUtil;
