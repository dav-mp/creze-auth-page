import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spiner } from '../presentation/components/spinner/spiner'
import { ProtectedRouteByEmail } from './ProtectedRouteByEmail';
import { ProtectedRouteByUserSession } from './ProtectedRouteByUserSession';


const Register = lazy(() => import('../presentation/page/register/userRegister'))
const UserConfirm = lazy(() => import('../presentation/page/userConfirm/UserConfirm'))
const Login = lazy(() => import('../presentation/page/login/Login'))
const UserConfirmMFA = lazy(() => import('../presentation/page/userConfirmMFA/UserConfirmMFA'))
const UserVerifyMFA = lazy(() => import('../presentation/page/userVerifyMFA2/UserVerifyMFA2'))
const MainPage = lazy(() => import('../presentation/page/mainPage/mainPage'))
// const Demo = lazy(() => import('../pages/DemoPage'))
// const NewBorn = lazy(() => import('../pages/NewBorn/NewBorn'))


const AppRouter = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Spiner />} >
        {/* <Login /> */}
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/login" element={<Login user={user}/>} /> */}

            <Route element={<ProtectedRouteByEmail/>}>
              <Route path="/userConfirm" element={<UserConfirm />} />
              <Route path="/confirmMFA" element={<UserConfirmMFA />} />
              <Route path="/verifyMFA" element={<UserVerifyMFA />} />
            </Route>

            <Route element={<ProtectedRouteByUserSession/>}>
              <Route path="/main" element={<MainPage />} />
            </Route>


            <Route path='*' element={<h1>Sin info</h1>}/>
          {/* </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )

}
export default AppRouter
 