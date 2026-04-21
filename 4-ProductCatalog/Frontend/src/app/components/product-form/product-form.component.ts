import { Component, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CategoryListViewModel } from '../../models/category.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: CategoryListViewModel[] = [];
  isSubmitting = false;
  isLoadingCategories = true;
  errorMessage = '';

  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      categoryId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    this.categoryService.onCategoryChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadCategories();
      });
  }

  loadCategories(): void {
    this.categoryService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.isLoadingCategories = false;
        },
        error: () => {
          this.errorMessage = 'Erro ao carregar categorias. Tente novamente.';
          this.isLoadingCategories = false;
        }
      });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const pay = {
      name: this.productForm.value.name,
      price: parseFloat(this.productForm.value.price),
      categoryId: parseInt(this.productForm.value.categoryId, 10)
    };

    this.productService.create(pay).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Produto cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.productForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao salvar produto.';
      }
    });
  }
}