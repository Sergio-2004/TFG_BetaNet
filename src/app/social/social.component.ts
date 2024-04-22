import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { GamesService } from '../services/game/games.service';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  private gamesService: GamesService = inject(GamesService);
  public games: Game[] = this.gamesService.getGamesList();

}
