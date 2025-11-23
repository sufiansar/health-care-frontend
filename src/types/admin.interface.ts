export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
