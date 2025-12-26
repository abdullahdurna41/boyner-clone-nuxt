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
  orderBy,
  where, // [YENİ EKLENDİ]
  limit  // [YENİ EKLENDİ]
} from 'firebase/firestore'
import type { IProduct } from '@/types'

export const useProductStore = defineStore('product', {
  // 1. STATE (Depo): Verilerin durduğu yer
  state: () => ({
    products: [] as IProduct[], // Tüm ürün listesi
    currentProduct: null as IProduct | null, // Detay sayfasına gidilen ürün
    similarProducts: [] as IProduct[],
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
    async fetchSimilarProducts(currentProductId: string, category?: string) {
      this.loading = true
      const db = getFirestore()
      
      try {
        let q;

        // Senaryo A: Eğer kategori bilgisi varsa, o kategoriden 6 ürün çek
        if (category) {
          q = query(
            collection(db, 'products'), 
            where('category', '==', category),
            limit(6) 
          )
        } 
        // Senaryo B: Kategori yoksa rastgele (veya son eklenen) 6 ürün çek
        else {
          q = query(
            collection(db, 'products'),
            orderBy('createdAt', 'desc'),
            limit(6)
          )
        }

        const querySnapshot = await getDocs(q)
        const rawProducts = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as IProduct[]
        
        // Kendisini (şu anki ürünü) listeden çıkar
        this.similarProducts = rawProducts.filter(p => p.id !== currentProductId)
        
      } catch (err: any) {
        console.error('Benzer Ürünler Hatası:', err)
        // Hata olsa bile slider boş kalsın, uygulamayı kırmasın
        this.similarProducts = []
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