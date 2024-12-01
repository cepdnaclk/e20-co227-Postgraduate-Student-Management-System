import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-second-navigation',
  templateUrl: './second-navigation.component.html',
  styleUrls: ['./second-navigation.component.css']
})
export class SecondNavigationComponent {

  dropdowns = [
    { title: 'Computer Engineering', item1: 'Facilities', item2: 'Specializations', item3: 'About', isOpen: false },
    { title: 'Postgraduate Studies', item1: 'Researches', item2: 'Research Facilities', item3: 'Procedure', isOpen: false },
    { title: 'Centers & Units', item1: 'Computer Engineering Department', item2: 'Center for Engineering Research', item3: 'Computing Centre', isOpen: false },
    { title: 'Department & Staff', item1: 'Student Help guide', item2: 'Department ADPC', item3: 'IQAC', isOpen: false }
  ];

  toggleDropdown(dropdown: any, event: MouseEvent): void {
    event.stopPropagation();
    this.dropdowns.forEach(dd => {
      if (dd !== dropdown) {
        dd.isOpen = false;
      }
    });
    dropdown.isOpen = !dropdown.isOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.myDropdown')) {
      this.dropdowns.forEach(dropdown => {
        dropdown.isOpen = false;
      });
    }
  }
}
