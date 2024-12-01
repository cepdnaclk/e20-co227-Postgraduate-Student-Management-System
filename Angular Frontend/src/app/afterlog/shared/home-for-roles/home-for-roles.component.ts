import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-home-for-roles',
  templateUrl: './home-for-roles.component.html',
  styleUrl: './home-for-roles.component.css'
})
export class HomeForRolesComponent {

  userName: string | null = null;

  constructor(
    private router: Router,
    private userRoleService: UserRoleService) {
      this.userRoleService.userId$.subscribe(id => {
        this.userName = id;
      });
    }


}
