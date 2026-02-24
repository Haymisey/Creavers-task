import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.authService.currentUserValue.token || ''
    });
  }

  // Admin CRUD
  getTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/teachers`, { headers: this.headers });
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/teachers`, teacher, { headers: this.headers });
  }

  updateTeacher(id: string, teacher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/teachers/${id}`, teacher, { headers: this.headers });
  }

  deleteTeacher(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/teachers/${id}`, { headers: this.headers });
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/students`, { headers: this.headers });
  }

  addStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/students`, student, { headers: this.headers });
  }

  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/students/${id}`, student, { headers: this.headers });
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/students/${id}`, { headers: this.headers });
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/subjects`, { headers: this.headers });
  }

  addSubject(subject: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/subjects`, subject, { headers: this.headers });
  }

  updateSubject(id: string, subject: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/subjects/${id}`, subject, { headers: this.headers });
  }

  deleteSubject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/subjects/${id}`, { headers: this.headers });
  }

  getGrades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/grades`, { headers: this.headers });
  }

  addGrade(grade: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/grades`, grade, { headers: this.headers });
  }

  updateGrade(id: string, grade: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/grades/${id}`, grade, { headers: this.headers });
  }

  deleteGrade(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/grades/${id}`, { headers: this.headers });
  }

  // Teacher CRUD
  getAssignedStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/assigned-students`, { headers: this.headers });
  }

  assignMarks(markData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/teacher/marks`, markData, { headers: this.headers });
  }

  getMarksByGrade(gradeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/marks/${gradeId}`, { headers: this.headers });
  }

  // Student CRUD
  getMyMarks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/marks`, { headers: this.headers });
  }
}
