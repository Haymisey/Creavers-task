import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grade-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <h1 mat-dialog-title>Add Grade</h1>
    <div mat-dialog-content>
      <form [formGroup]="gradeForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Grade Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Assign Teacher</mat-label>
          <mat-select formControlName="teacherId">
            <mat-option *ngFor="let t of data.teachers" [value]="t._id">{{t.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Assign Students</mat-label>
          <mat-select formControlName="studentIds" multiple>
            <mat-option *ngFor="let s of data.students" [value]="s._id">{{s.name}}</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [disabled]="gradeForm.invalid" (click)="onSubmit()" color="primary">Add</button>
    </div>
  `,
  styles: ['.full-width { width: 100%; }']
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
      studentIds: [[]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.gradeForm.value);
  }
}
