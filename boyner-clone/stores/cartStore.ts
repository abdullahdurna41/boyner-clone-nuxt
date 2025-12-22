import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useOrderStore } from "./orderStore";
import type { IProduct, ICartItem } from "@/types";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as ICartItem[],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    subTotal: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),

    shippingCost(): number {
      return this.subTotal > 1000 ? 0 : 59.9;
    },

    totalAmount(): number {
      return this.subTotal + this.shippingCost;
    },
  },

  actions: {
    addToCart(product: IProduct) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      alert("Ürün sepete eklendi!");
      this.saveToLocalStorage();
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((i) => i.product.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) this.removeItem(productId);
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter((item) => item.product.id !== productId);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      // Sadece tarayıcı tarafında çalışsın (Server'da hata vermesin)
      if (typeof window !== "undefined") {
        localStorage.setItem("myCart", JSON.stringify(this.items));
      }
    },
    loadFromLocalStorage() {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("myCart");
        if (saved) {
          this.items = JSON.parse(saved);
        }
      }
    },
    clearCart() {
      this.items = [];
    },

    // --- SATIN ALMA İŞLEMİ (Order Store'a Bağlanır) ---
    async checkout() {
      const authStore = useAuthStore()
      const orderStore = useOrderStore()

      // 1. Kullanıcı Kontrolü
      if (!authStore.user) {
        alert('Sipariş vermek için lütfen giriş yapın.')
        return navigateTo('/login')
      }

      // 2. Sepet Kontrolü
      if (this.items.length === 0) {
        alert('Sepetiniz boş.')
        return
      }

      // 3. Veriyi Hazırla (Güvenli Mapping)
      const cleanItems = this.items.map(item => ({
        productId: item.product.id || 'unknown',
        title: item.product.name || 'Ürün',
        price: Number(item.product.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.product.images?.[0] || ''
      }))

      const orderData = {
        userId: authStore.user.uid,
        userEmail: authStore.user.email || 'user@boyner.com',
        items: cleanItems,
        totalAmount: Number(this.totalAmount),
        status: 'hazirlaniyor',
        address: {
          city: 'İstanbul',
          fullAddress: 'Örnek Teslimat Adresi'
        }
      }

      // 4. Gönder
      try {
        const success = await orderStore.createOrder(orderData as any)
        
        if (success) {
          alert('Siparişiniz başarıyla alındı!')
          this.clearCart() // Sepeti boşalt
          this.saveToLocalStorage() // Boş halini kaydet
          return navigateTo('/') // Anasayfaya yönlendir
        } else {
          alert('Sipariş oluşturulurken bir hata oluştu.')
        }
      } catch (e) {
        console.error("Sipariş Hatası:", e)
        alert('Beklenmedik bir hata oluştu.')
      }
    },
  },
});
