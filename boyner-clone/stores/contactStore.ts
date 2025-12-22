import { defineStore } from 'pinia'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import type { IMessage } from '@/types'

export const useContactStore = defineStore('contact', {
  state: () => ({
    messages: [] as IMessage[],
    loading: false
  }),

  actions: {
    // --- MESAJ GÖNDER (Müşteri) ---
    async sendMessage(data: { name: string, email: string, subject: string, message: string }) {
      this.loading = true
      const db = getFirestore()
      
      try {
        await addDoc(collection(db, 'messages'), {
          ...data,
          createdAt: new Date(),
          isRead: false
        })
        return true
      } catch (e) {
        console.error('Mesaj gönderme hatası:', e)
        return false
      } finally {
        this.loading = false
      }
    },

    // --- MESAJLARI GETİR (Admin) ---
    async fetchMessages() {
      this.loading = true
      const db = getFirestore()
      try {
        // Tarihe göre tersten sırala (En yeni en üstte)
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        
        this.messages = snap.docs.map(doc => {
            const data = doc.data()
            return { 
                id: doc.id, 
                ...data,
                // Timestamp'i JS Date objesine çeviriyoruz
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
            }
        }) as IMessage[]
      } catch (e) {
        console.error('Mesajları çekme hatası:', e)
      } finally {
        this.loading = false
      }
    },

    // --- MESAJ SİL (Admin) ---
    async deleteMessage(id: string) {
      if(!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return
      
      const db = getFirestore()
      await deleteDoc(doc(db, 'messages', id))
      // State'den de sil (Tekrar istek atmana gerek kalmaz)
      this.messages = this.messages.filter(m => m.id !== id)
    }
  }
})