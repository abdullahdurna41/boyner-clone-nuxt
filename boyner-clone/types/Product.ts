export interface IProduct {
  id?: string;             // Firebase ID'si
  brand: string;           // Marka (Örn: Ipekyol)
  name: string;            // Ürün Adı
  price: number;           // Fiyat
  oldPrice?: number;       // Eski Fiyat
  discountRate?: number;   // İndirim Oranı
  badge?: string;          // Rozet (Yeni Sezon vs.)
  description?: string;    // Açıklama
  category?: string;       // Kategori
  
  images: string[];        // Resimler
  
  specs?: { 
    label: string; 
    value: string; 
  }[];
  
  isActive: boolean;
  createdAt?: Date;
}