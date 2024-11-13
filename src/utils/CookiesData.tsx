import Cookies from 'js-cookie';


export const setCookiesData = ( field:string, data: string ) => {
  
    Cookies.set(field, data, { expires: 7, secure: true, sameSite: 'Strict' });

}


export const getCookiesData = ( field: string ): string | null => {
  
    const token = Cookies.get(field);

    return token ?? null

}

export const deleteCookiesData = ( field: string ) => {
    Cookies.remove( field )
}