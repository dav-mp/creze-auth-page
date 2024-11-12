import Cookies from 'js-cookie';


export const setCookiesData = ( data: string ) => {
  
    Cookies.set('email', data, { expires: 7, secure: true, sameSite: 'Strict' });

}


export const getCookiesData = ( field: string ): string | null => {
  
    const token = Cookies.get(field);

    return token ?? null

}