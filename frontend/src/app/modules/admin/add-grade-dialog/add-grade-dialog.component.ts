import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grade-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>Create Academic Class</h2>
      <button mat-icon-button (click)="onNoClick()"><mat-icon>close</mat-icon></button>
    </div>
    <div mat-dialog-content>
      <form [formGroup]="classForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Class Name</mat-label>
          <mat-icon matPrefix>class</mat-icon>
          <input matInput formControlName="name" placeholder="e.g. 10-A">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Enrolled Students</mat-label>
          <mat-icon matPrefix>group</mat-icon>
          <mat-select formControlName="studentIds" multiple>
            <mat-option *ngFor="let s of data.students" [value]="s._id">{{s.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="sub-header">
          <h3>Subject Assignments</h3>
          <button mat-stroked-button color="primary" type="button" (click)="addAssignment()">
            <mat-icon>add</mat-icon> Add Subject
          </button>
        </div>

        <div formArrayName="subjectTeachers" class="assignments-list">
          <div *ngFor="let item of subjectTeachers.controls; let i=index" [formGroupName]="i" class="assignment-row">
            <mat-form-field appearance="outline">
              <mat-label>Subject</mat-label>
              <mat-select formControlName="subject">
                <mat-option *ngFor="let sub of data.subjects" [value]="sub._id">{{sub.name}}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Teacher</mat-label>
              <mat-select formControlName="teacher">
                <mat-option *ngFor="let t of data.teachers" [value]="t._id">{{t.name}}</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-icon-button color="warn" (click)="removeAssignment(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="classForm.invalid" (click)="onSubmit()">
        Create Class
      </button>
    </div>
  `,
  styles: [`
    .dialog-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
    h2 { margin: 0; font-weight: 700; color: white; }
    .dialog-form { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; }
    .full-width { width: 100%; }
    .sub-header { display: flex; justify-content: space-between; align-items: center; margin: 16px 0 8px; }
    .sub-header h3 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); }
    .assignments-list { display: flex; flex-direction: column; gap: 8px; }
    .assignment-row { display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: center; }
    .dialog-actions { padding: 16px 0 0; }
    button[mat-button] { color: var(--text-muted); }
    button[mat-flat-button] { border-radius: 12px; font-weight: 600; padding: 0 24px; color: white !important; }
  `]
})
export class AddGradeDialogComponent {
  classForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      studentIds: [[], Validators.required],
      subjectTeachers: this.fb.array([])
    });
    // Add one initial assignment row
    this.addAssignment();
  }

  get subjectTeachers() {
    return this.classForm.get('subjectTeachers') as FormArray;
  }

  addAssignment() {
    const group = this.fb.group({
      subject: ['', Validators.required],
      teacher: ['', Validators.required]
    });
    this.subjectTeachers.push(group);
  }

  removeAssignment(index: number) {
    this.subjectTeachers.removeAt(index);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      this.dialogRef.close(this.classForm.value);
    }
  }
}
