/* eslint-disable */
import { createContext, useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import {
  authenticate,
  getCurrentUser,
  getUserData,
  validateSession,
} from './services/auth.services'
import Cookies from 'js-cookie'



const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true)
  const [cognitoUser, setCognitoUser] = useState(null)
  const [user, setUser] = useState(null)
  const [currentPass, setCurrentPassUser] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const [isOrganization, setIsOrganization] = useState(false)

  useEffect(() => {
  
    const sessionUser = getCurrentUser()
   
    if (!sessionUser) return setIsValidating(false)


    validateSession(sessionUser)
      .then((_cognitoUser) => {
        
            setCognitoUser(sessionUser)
            setUser(JSON.parse(_cognitoUser).result)
            setIsValidating(false) 
      })
      .catch((error) => {
        setIsValidating(false)
  
        enqueueSnackbar('Error validando sesión', {
          persist: false,
          variant: 'error',
        })
      })
  }, [isOrganization])

  const login = async (values) =>{
   await authenticate(values).then(async (cUser) => {
    try{
      const data = await getUserData(cUser.token)
      setCognitoUser(cUser)
      setUser(JSON.parse(data.data).result)
      setCurrentPassUser(values.password);
    }catch(err){
      setUser(null)
    }
     })
  
  }
 
  

  const logout = () => {
    //cognitoUser.signOut()
    setCognitoUser(null)
    setUser(null)
    setCurrentPassUser(null);
    Cookies.remove('token')
  }

  return (
    <AuthContext.Provider
      value={{
        authenticate: login,
        cognitoUser,
        isValidating,
        logout,
        user,
        currentPass,
        setIsOrganization
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
