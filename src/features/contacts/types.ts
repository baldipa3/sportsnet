export interface ContactType {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

export interface ContactProps {
  contact: ContactType;
}
