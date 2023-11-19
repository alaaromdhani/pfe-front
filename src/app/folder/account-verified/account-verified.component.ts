import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-verified',
  templateUrl: './account-verified.component.html',
  styleUrls: ['./account-verified.component.scss'],
})
export class AccountVerifiedComponent  implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigate(['/folder/me'])

    },3000)
  }

}
