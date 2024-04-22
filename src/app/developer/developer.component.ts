import { Component, ElementRef, OnInit } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  getSession(){
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user')){
      console.log(true);
      return sessionStorage.getItem('user');
    }else{
      console.log(false);
      return false;
    }
  }
}
