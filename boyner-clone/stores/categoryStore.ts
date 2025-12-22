import { defineStore } from 'pinia'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import type { ICategory } from '@/types'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
    loading: false
  }),

  actions: {
    // --- KATEGORİLERİ GETİR ---
    async fetchCategories() {
      this.loading = true
      const db = getFirestore()
      try {
        const snap = await getDocs(collection(db, 'categories'))
        this.categories = snap.docs.map(d => ({ 
          id: d.id, 
          ...d.data() 
        })) as ICategory[]
      } catch (e) {
        console.error('Kategori Hatası:', e)
      } finally {
        this.loading = false
      }
    },

    // --- KATEGORİ EKLE ---
    async addCategory(name: string) {
      const db = getFirestore()
      try {
        await addDoc(collection(db, 'categories'), { name })
        await this.fetchCategories() // Listeyi yenile
        return true
      } catch (e) {
        return false
      }
    },

    // --- KATEGORİ SİL ---
    async deleteCategory(id: string) {
      if(!confirm('Kategoriyi silmek istediğine emin misin?')) return
      const db = getFirestore()
      await deleteDoc(doc(db, 'categories', id))
      this.categories = this.categories.filter(c => c.id !== id)
    }
  }
})