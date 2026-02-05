import { createContext, useContext, useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth"

const UserContext = createContext({
  user: null,
  updateUser: () => {},
  logout: () => {},
})

export const UserProvider = ({ children }) => {
  const { user: storeUser, setUser, signOut } = useAuthStore()
  const [user, setLocalUser] = useState(storeUser)

  // Initialize from localStorage on mount if store is empty
  useEffect(() => {
    if (!storeUser) {
      try {
        const raw = localStorage.getItem("userInfo")
        if (raw) {
          const parsed = JSON.parse(raw)
          setUser?.(parsed)
          setLocalUser(parsed)
          return
        }
      } catch {
        // ignore parse errors, fall back to null
      }
    } else {
      setLocalUser(storeUser)
    }
  }, [storeUser, setUser])

  const persistUser = (nextUser) => {
    setLocalUser(nextUser)
    setUser?.(nextUser)
    if (nextUser) {
      localStorage.setItem("userInfo", JSON.stringify(nextUser))
    } else {
      localStorage.removeItem("userInfo")
    }
  }

  const updateUser = (updates) => {
    setLocalUser((prev) => {
      const merged = { ...(prev || {}), ...updates }
      persistUser(merged)
      return merged
    })
  }

  const logout = () => {
    signOut?.()
    persistUser(null)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

