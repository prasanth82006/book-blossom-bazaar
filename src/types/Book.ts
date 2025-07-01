
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  price: number;
  image: string;
  description: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  createdAt: string;
  isbn?: string;
  language: string;
  pages?: number;
}

export interface BookFilter {
  search: string;
  genre: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'title';
}
