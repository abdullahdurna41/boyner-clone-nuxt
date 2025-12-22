import { Firestore } from 'firebase/firestore'
import { Auth } from 'firebase/auth'

export const useFirestore = (): Firestore => {
  const { $db } = useNuxtApp()
  return $db as Firestore
}

export const useFirebaseAuth = (): Auth => {
  const { $auth } = useNuxtApp()
  return $auth as Auth
}