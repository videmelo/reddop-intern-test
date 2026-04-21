import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryListViewModel, CreateCategoryDTO } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:5266/api/Categories';

  public onCategoryChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryListViewModel[]> {
    return this.http.get<CategoryListViewModel[]>(this.apiUrl);
  }

  create(dto: CreateCategoryDTO): Observable<any> {
    return this.http.post(this.apiUrl, dto).pipe(
      tap(() => this.onCategoryChanged.next())
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.onCategoryChanged.next())
    );
  }
}
