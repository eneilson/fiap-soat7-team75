export interface IClient {
  id?: string;
  name: string;
  document: string;
  address: {
    city?: string;
    number: string;
    state?: string;
    street?: string;
    zip: string;
  };
  phone: string;
  email: string;
}
