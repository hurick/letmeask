import { useState, useEffect, createContext, ReactNode } from 'react'
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

type User = {
  id: string
  name: string
  avatar: string
}

export const AuthContext = createContext({} as AuthContextType)

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL)
          throw new Error('Missing information from Google Account')

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async (): Promise<void> => {
    const res = await signInWithPopup(getAuth(), new GoogleAuthProvider())

    if (res?.user) {
      const {
        user: {
          displayName,
          photoURL,
          uid
        }
      } = res

      if (!displayName || !photoURL)
        throw new Error('Missing information from Google Account')

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
