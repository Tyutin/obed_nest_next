export interface ProfileRawInterface {
  id: number;
  vkId: number;
  firstName: string;
  lastName: string;
  phone: string;
  buildingAdress?: string;
  entranceNumber?: number;
  apartmentNumber?: number;
  floorNumber?: number;
  commentForDelivery?: string;
  points?: number;
}