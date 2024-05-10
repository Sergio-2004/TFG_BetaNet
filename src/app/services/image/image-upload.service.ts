import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadImage(image: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name); // Agregar el atributo "name" al FormData

    return this.http.post<any>('http://localhost/ProyectoFinal_DAW/HTMLRequests/saveProfileImage.php', formData);
  }
}
