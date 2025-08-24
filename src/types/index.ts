export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface Transaction {
  id: number;
  productName: string;
  price: number;
  date: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  image: string;
}
