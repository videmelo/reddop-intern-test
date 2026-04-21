import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductListViewModel, ProductDetailDTO, CreateProductDTO } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5266/api/Products';
  
  public onProductChanged = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductListViewModel[]> {
    return this.http.get<ProductListViewModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProductDetailDTO> {
    return this.http.get<ProductDetailDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto).pipe(
      tap(() => this.onProductChanged.next())
    );
  }
}