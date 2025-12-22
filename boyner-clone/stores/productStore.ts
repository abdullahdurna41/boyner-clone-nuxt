// stores/product.ts
import { defineStore } from 'pinia'
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy
} from 'firebase/firestore'
import type { IProduct } from '@/types'

export const useProductStore = defineStore('product', {
  // 1. STATE (Depo): Verilerin durduğu yer
  state: () => ({
    products: [] as IProduct[], // Tüm ürün listesi
    currentProduct: null as IProduct | null, // Detay sayfasına gidilen ürün
    loading: false,
    error: null as string | null
  }),

  // 2. ACTIONS (İşçiler): Firebase ile konuşan fonksiyonlar
  actions: {
    // --- C (CREATE) - Ürün Ekleme ---
    async addProduct(productData: IProduct) {
      this.loading = true
      this.error = null
      const db = getFirestore()
      
      try {
        // 'products' koleksiyonuna ekle
        const docRef = await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date() // Tarih damgası ekle
        })
        
        // State'e de ekle (Sayfa yenilenmeden listede görünsün)
        const newProduct = { ...productData, id: docRef.id }
        this.products.push(newProduct as IProduct)
        
        return true
      } catch (err: any) {
        console.error('Ekleme Hatası:', err)
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    // --- R (READ) - Tüm Ürünleri Getirme ---
    async fetchProducts() {
      this.loading = true
      const db = getFirestore()
      
      try {
        // Ürünleri tarihe göre sıralı çek (Opsiyonel)
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        
        this.products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as IProduct[]
        
      } catch (err: any) {
        console.error('Listeleme Hatası:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // --- R (READ) - Tek Ürün Getirme (Detay Sayfası İçin) ---
    async fetchProductById(id: string) {
      this.loading = true
      const db = getFirestore()
      
      try {
        const docRef = doc(db, 'products', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.currentProduct = { id: docSnap.id, ...docSnap.data() } as IProduct
          return this.currentProduct
        } else {
          this.error = 'Ürün bulunamadı'
          return null
        }
      } catch (err: any) {
        console.error('Detay Hatası:', err)
        this.error = err.message
        return null
      } finally {
        this.loading = false
      }
    },

    // --- U (UPDATE) - Ürün Güncelleme ---
    async updateProduct(id: string, updates: Partial<IProduct>) {
      this.loading = true
      const db = getFirestore()
      
      try {
        const docRef = doc(db, 'products', id)
        await updateDoc(docRef, updates)
        
        // State'i güncelle
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...updates }
        }
        
        return true
      } catch (err: any) {
        console.error('Güncelleme Hatası:', err)
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    // --- D (DELETE) - Ürün Silme ---
    async deleteProduct(id: string) {
      if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return false
      
      this.loading = true
      const db = getFirestore()
      
      try {
        await deleteDoc(doc(db, 'products', id))
        
        // Listeden çıkar
        this.products = this.products.filter(p => p.id !== id)
        return true
      } catch (err: any) {
        console.error('Silme Hatası:', err)
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    }
  }
})