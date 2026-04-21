export interface ProductListViewModel {
  id: number;
  name: string;
  price: number;
  categoryName: string;
}

export interface ProductDetailDTO {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  categoryId: number;
}