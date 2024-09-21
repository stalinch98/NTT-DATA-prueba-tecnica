import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEdit: boolean = false;

  formData = {
    idProduct: '',
    name: '',
    description: '',
    logo: '',
    releaseDate: '',
    revisionDate: '',
  };

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    console.log(this.formData);
   }
}
