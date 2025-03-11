import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';  
import { Observable } from 'rxjs';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  users$: Observable<CustomHttpResponse<number>>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.nbrOfUsers$(); 
  }
}
