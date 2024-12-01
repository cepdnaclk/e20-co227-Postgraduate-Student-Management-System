import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-collapsible-section',
  templateUrl: './collapsible-section.component.html',
  styleUrls: ['./collapsible-section.component.css']
})
export class CollapsibleSectionComponent {

  userRole: string | null = null; // Assuming you get the user role from some service

  constructor(
    private userRoleService: UserRoleService
  ) {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  @Input() id: number = 0;
  @Input() regNumber: string | null = null;
  @Input() activeTab: string | null = null;
  @Input() buttonName: string = '';
  @Input() tiles!: { id: number, type: string, title: string }[];
  @Output() editSection = new EventEmitter<{ buttonName: string, tiles: { type: string, title: string }[] }>();

  isCollapsed: boolean = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  isDeleteSectionPopupOpen: boolean = false;
  openDeleteSectionPopup(){
    this.isDeleteSectionPopupOpen = true;
  }
  closeDeleteSectionPopup(){
    this.isDeleteSectionPopupOpen = false;
  }

  isModalOpen = false;
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

}
