import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>Add New {{data.role}}</h2>
      <button mat-icon-button (click)="onNoClick()"><mat-icon>close</mat-icon></button>
    </div>
    <div mat-dialog-content>
      <form [formGroup]="userForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Full Name</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input matInput formControlName="name" placeholder="Enter name">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email Address</mat-label>
          <mat-icon matPrefix>mail</mat-icon>
          <input matInput formControlName="email" placeholder="Enter email">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Secure Password</mat-label>
          <mat-icon matPrefix>lock</mat-icon>
          <input matInput type="password" formControlName="password" placeholder="Min 6 characters">
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="userForm.invalid" (click)="onSubmit()">
        Create {{data.role}}
      </button>
    </div>
  `,
  styles: [`
    .dialog-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
    h2 { margin: 0; font-weight: 700; color: white; }
    .dialog-form { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; }
    .full-width { width: 100%; }
    .dialog-actions { padding: 16px 0 0; }
    button[mat-button] { color: var(--text-muted); }
    button[mat-flat-button] { border-radius: 12px; font-weight: 600; padding: 0 24px; color: white !important; }
  `]
})
export class AddUserDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.userForm.value);
  }
}
