// Siparişin içindeki tek bir kalem ürün
export interface IOrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Siparişin kendisi
export interface IOrder {
  id?: string;             // Firebase ID
  userId: string;          // Siparişi veren
  userEmail: string;       
  items: IOrderItem[];     // Sepetteki ürünler
  totalAmount: number;     // Toplam Tutar
  status: 'hazirlaniyor' | 'kargoda' | 'teslim-edildi' | 'iptal';
  address: {
    city: string;
    fullAddress: string;
  };
  createdAt: Date;
}