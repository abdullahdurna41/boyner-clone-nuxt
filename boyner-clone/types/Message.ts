export interface IMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date | any; // Firebase Timestamp gelebilir
  isRead?: boolean; // Okundu/Okunmadı durumu (Opsiyonel)
}