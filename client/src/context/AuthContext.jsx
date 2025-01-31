import React from 'react'
import { 
    createContext,
    useContext,
    useState,
    useEffect
 } from 'react'

 import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile
 } from 'firebase/auth'

 import { auth } from '../../firebaseConfig'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error('must be used withing Auth Provider')
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        // listens for auth state changes 
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        // cleanup 
        return unsubscribe
    }, [])

    // singup with email and password
    const signup = async(email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, {
                displayName: name
            })

            // set the user name
            if (name) {
                await updateProfile(userCredential.user, {
                displayName: name
                })
            }
            return userCredential.user
        } catch (error) {
            throw error
        }
    }

      // login with email and password
      const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            return userCredential.user
        } catch (error) {
            throw error
        }
      }

      // sign in with Google
      const googleSingIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const userCredential = await signInWithPopup(auth, provider)
            return userCredential.user
        } catch (error) {
            throw error
        }
      }

    // logout
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            throw error
        }
    }

    const value = {
        user,
        loading,
        signup,
        login,
        googleSingIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

