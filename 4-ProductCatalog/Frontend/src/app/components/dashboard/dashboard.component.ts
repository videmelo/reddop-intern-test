import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductListViewModel } from '../../models/product.model';
import { CategoryListViewModel } from '../../models/category.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  products: ProductListViewModel[] = [];
  categories: CategoryListViewModel[] = [];
  loadingProducts = true;
  loadingCategories = true;
  error = '';
  success = '';

  private destroyRef = inject(DestroyRef);

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();

    this.productService.onProductChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadProducts());

    this.categoryService.onCategoryChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadCategories();
        this.loadProducts();
      });
  }

  loadProducts(): void {
    this.loadingProducts = true;
    this.productService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        this.products = data;
        this.loadingProducts = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos';
        this.loadingProducts = false;
      }
    });
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.categoryService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar categorias';
        this.loadingCategories = false;
      }
    });
  }

  loadData(): void {
    this.loadProducts();
    this.loadCategories();
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente apagar esta categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              Swal.fire('Deletado!', 'A categoria foi apagada.', 'success');
              this.loadData();
            },
            error: (err) => {
              if (err.status === 409 || err.status === 400) {
                const msg = err.error?.message || 'Existem produtos vinculados a esta categoria.';
                Swal.fire('Atenção', msg, 'error');
              } else {
                Swal.fire('Erro', 'Ocorreu um erro ao apagar a categoria.', 'error');
              }
            }
          });
      }
    });
  }
}