import { defineStore } from 'pinia'
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  updateDoc 
} from 'firebase/firestore'
import type { IOrder } from '@/types'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as IOrder[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // --- SİPARİŞ OLUŞTUR (Cart Store burayı kullanacak) ---
    async createOrder(orderData: IOrder) {
      this.loading = true
      const db = getFirestore()

      try {
        const docRef = await addDoc(collection(db, 'orders'), {
          ...orderData,
          createdAt: new Date()
        })
        
        // Başarılı logu kalabilir, geliştirici için iyidir
        console.log("Sipariş oluşturuldu ID:", docRef.id) 
        return true

      } catch (err: any) {
        console.error('Firebase Sipariş Hatası:', err.message)
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    // --- KULLANICININ SİPARİŞLERİNİ GETİR (Profil sayfası için) ---
    async fetchUserOrders(userId: string) {
      this.loading = true
      const db = getFirestore()

      try {
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        )
        const querySnapshot = await getDocs(q)
        
        this.orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() 
        })) as IOrder[]

      } catch (err: any) {
        console.error('Sipariş Getirme Hatası:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // --- TÜM SİPARİŞLERİ GETİR (Admin Paneli için) ---
    async fetchAllOrders() {
      this.loading = true
      const db = getFirestore()
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        this.orders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        })) as IOrder[]
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // --- SİPARİŞ DURUMU GÜNCELLE (Admin Paneli için) ---
    async updateOrderStatus(orderId: string, newStatus: string) {
      const db = getFirestore()
      try {
        const orderRef = doc(db, 'orders', orderId)
        await updateDoc(orderRef, { status: newStatus })
        
        // State'i güncelle
        const order = this.orders.find(o => o.id === orderId)
        if (order) order.status = newStatus as any
        return true
      } catch (err: any) {
        this.error = err.message
        return false
      }
    }
  }
})