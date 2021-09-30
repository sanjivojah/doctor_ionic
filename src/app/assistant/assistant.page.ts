import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.page.html',
  styleUrls: ['./assistant.page.scss'],
})
export class AssistantPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goto(id){
    this.router.navigateByUrl('/locationresult/'+id);
  }

}
