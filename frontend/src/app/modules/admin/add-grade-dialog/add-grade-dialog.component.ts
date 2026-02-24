import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grade-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>Create Academic Class</h2>
      <button mat-icon-button (click)="onNoClick()"><mat-icon>close</mat-icon></button>
    </div>
    <div mat-dialog-content>
      <form [formGroup]="gradeForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Class Name</mat-label>
          <mat-icon matPrefix>class</mat-icon>
          <input matInput formControlName="name" placeholder="e.g. Grade 10-A">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Assigned Teacher</mat-label>
          <mat-icon matPrefix>school</mat-icon>
          <mat-select formControlName="teacherId">
            <mat-option *ngFor="let t of data.teachers" [value]="t._id">{{t.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Enrolled Students</mat-label>
          <mat-icon matPrefix>group</mat-icon>
          <mat-select formControlName="studentIds" multiple>
            <mat-option *ngFor="let s of data.students" [value]="s._id">{{s.name}}</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="gradeForm.invalid" (click)="onSubmit()">
        Create Class
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
export class AddGradeDialogComponent {
  gradeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      teacherId: ['', Validators.required],
      studentIds: [[], Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.gradeForm.value);
  }
}
