import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-marks-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <h1 mat-dialog-title>Assign Marks for {{data.student.name}}</h1>
    <div mat-dialog-content>
      <form [formGroup]="markForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Subject</mat-label>
          <mat-select formControlName="subjectId">
            <mat-option *ngFor="let sub of data.subjects" [value]="sub._id">{{sub.name}}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Marks</mat-label>
          <input matInput type="number" formControlName="marks">
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [disabled]="markForm.invalid" (click)="onSubmit()" color="primary">Save</button>
    </div>
  `,
  styles: ['.full-width { width: 100%; }']
})
export class AssignMarksDialogComponent {
  markForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssignMarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.markForm = this.fb.group({
      subjectId: ['', Validators.required],
      marks: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.markForm.value);
  }
}
