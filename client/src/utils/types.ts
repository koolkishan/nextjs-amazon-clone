export interface Category {
  id: string;
}

export interface Order {
  id: string;
}

export interface ProductType {
  category: Category;
  order: Order[];
  colors: string[];
  createdAt: string;
  description: string[];
  discountPrice: number;
  id: string;
  images: string[];
  salePrice: number;
  title: string;
  updatedAt: string;
  variants: string[];
}
