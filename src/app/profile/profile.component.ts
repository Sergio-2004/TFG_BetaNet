import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../services/session/userData.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SessionInitRequireComponent, UploadImageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor( private http: HttpClient, private data:UserDataService){
    this.data.currentImageUrl.subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    })
  }

  sessionService: SessionService = inject(SessionService);


  selectedFile?: File;
  imageUrl!: string;

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const user_id = this.sessionService.getSession()!.id;
    if (user_id === null) {
      console.error('user_id is null');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('picture', this.selectedFile);

    this.http.post('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/uploadPicture.php', formData)
      .subscribe(response => {
        console.log('Image uploaded successfully:', response);
        window.location.reload();
      }, error => {
        console.error('Error uploading image:', error);
      });
  }

  getProfileImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getProfileImage.php?fileName=${this.sessionService.getSession()?.id}.png`;
  }

  uploadDescription(description: string){
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/uploadDescription.php', {params: {'user_id': this.sessionService.getSession()!.id, 'description': description}})
      .subscribe({
        next: (response) => {
          console.log('Description uploaded successfully:', response);
          this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getUserData.php',  { params: { "user_id": this.sessionService.getSession()!.id}})
        .subscribe((response) => {
          console.log(response);
          this.sessionService.setSession(response.user);
        });
      }, error: (error) => {
        console.error('Error uploading description:', error);
      }});
  }

  deleteUser(){
    this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/deleteUser.php', {params: {'user_id': this.sessionService.getSession()!.id}})
      .subscribe(response => {
        console.log('User deleted successfully:', response);
        this.sessionService.closeSession();
      }, error => {
        console.error('Error deleting user:', error);
      });
  }
}
