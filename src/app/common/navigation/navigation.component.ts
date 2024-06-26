import { Component, inject } from '@angular/core';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor() {}

  sessionService: SessionService = inject(SessionService);

  imageUrl: string = '../../assets/profile.svg';

  getProfileImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getProfileImage.php?fileName=${this.sessionService.getSession()?.id}.png`;
  }

}
