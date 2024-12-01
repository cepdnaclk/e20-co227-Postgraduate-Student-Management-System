import { Component, Input } from '@angular/core';
import { EmailServiceService } from '../../services/email-service.service';
import { EmailTemplate } from '../../../models/email-template';
import { UserRoleService } from '../../services/user-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emails-page',
  templateUrl: './emails-page.component.html',
  styleUrls: ['./emails-page.component.css']
})
export class EmailsPageComponent {
  templates: EmailTemplate[] = [];
  selectedTemplateId: number | null = null;
  selectedTemplate: EmailTemplate = { id: 0, name: '', subject: '', body: '', userId: 0 };
  editorContent: string = '';  // This will hold the editor content

  constructor(private emailService: EmailServiceService,
    private userRoleService: UserRoleService
  ) {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    this.userRoleService.userIdId$.subscribe(userIdId => {
      this.userIdId = userIdId || 0;
    })
  }

  @Input() mode: 'editTemplate' | 'addNewTemplate' | 'sendEmail' | 'sendEmailToStudent' = 'sendEmail';
  @Input() emailHeading: boolean = true;
  @Input() regNo: string | null = null;

  userRole: string | null = null;
  activeTab: string = 'tab1';
  emailAddresses: string[] | any;
  userIdId: number = 0;

  ngOnInit(): void {
    this.loadTemplates();
    scrollTo(0,0);

    this.varSendEmail = true;
    console.log("Reg no in Emails page ", this.regNo);
  }

  // if (this.emails) {
  //   const emailList = this.emails.split(',').map(email => email.trim());
  //   console.log('Submitted emails:', emailList);
  // }

  // Tabs
  selectTab(tab: string) {
    this.activeTab = tab;
    if(tab === 'tab1'){
      this.sendEmail();
    }
    else if (tab === 'tab2'){
      this.addNewTemplate();
    }
    else{
      this.editTemplate();
    }
  }

  //Make changes here to load templates for the admin and the other users
  loadTemplates(): void {
    // if (this.userRole == 'admin'){
    //   this.emailService.getAllTemplates(this.userIdId).subscribe(
    //     (data) => {
    //       this.templates = data;
    //     },
    //     (error) => {
    //       console.error('Error fetching email templates', error);
    //     }
    //   );
    // }
    // else{
    //     if (this.userIdId != null){
    //       this.emailService.getAllTemplatesForAUser(this.userIdId).subscribe(
    //         (data) => {
    //           this.templates = data;
    //         },
    //         (error) => {
    //           console.error('Error fetching email templates', error);
    //         }
    //       );
    //     }
    //   }

       this.emailService.getAllTemplates(this.userIdId).subscribe(
        (data) => {
          this.templates = data;
        },
        (error) => {
          console.error('Error fetching email templates', error);
        }
      );
    }
    

  onTemplateChange(event: any): void {
    const selectedId = event.target.value;
    const selectedTemplate = this.templates.find(template => template.id === +selectedId);
    
    if (selectedTemplate) {
        // Load subject and content fields with the template data
        this.selectedTemplate = selectedTemplate; // Set selectedTemplate to the selected one
        this.editorContent = selectedTemplate.body; // Set editor content to the template body
        console.log('Selected Template:', this.selectedTemplate); // Debugging line
    } else {
        // Clear the fields if no template is selected
        this.selectedTemplate = { id: 0, name: '', subject: '', body: '', userId:0 };
        this.editorContent = '';
    }
}


  onTemplateSubmit(): void {
    if (this.selectedTemplateId !== null) {
      this.selectedTemplate.body = this.editorContent;
        this.emailService.updateTemplate(this.selectedTemplateId, this.selectedTemplate).subscribe(
            (response) => {
                console.log('Template updated successfully:', response);
                Swal.fire({
                  html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Template updated successfully.</b>',
                  timer: 2000,
                  position: 'top',
                  customClass: {
                    popup: 'custom-popup-class',
                    title: 'custom-title-class',
                    htmlContainer: 'custom-text-class'
                  },
                  background: '#fff',
                  backdrop: 'rgba(0, 0, 0, 0.4)',
                  showConfirmButton: false
                });
                this.loadTemplates(); 
            },
            (error) => {
                console.error('Error updating email template:', error);
                Swal.fire({
                  html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error updating Email template.</b>',
                  timer: 2000,
                  position: 'top',
                  customClass: {
                    popup: 'custom-popup-class',
                    title: 'custom-title-class',
                    htmlContainer: 'custom-text-class'
                  },
                  background: '#fff',
                  backdrop: 'rgba(0, 0, 0, 0.4)',
                  showConfirmButton: false
                });
            }
        );
    }
  }

  varSendEmail: boolean = true;
  varAddNewTemplate: boolean = false;
  varEditTemplate: boolean = false;
  sendEmail(){
    this.varSendEmail = true;
    this.varAddNewTemplate = false;
    this.varEditTemplate = false;
  }
  addNewTemplate(){
    this.varAddNewTemplate = true;
    this.varEditTemplate = false;
    this.varSendEmail = false;
  }
  editTemplate(){
    this.varEditTemplate = true;
    this.varAddNewTemplate = false;
    this.varSendEmail = false;
  }

  onNewTemplateSubmit(): void {
      this.selectedTemplate.body = this.editorContent;
      this.selectedTemplate.userId = this.userIdId;
        this.emailService.addNewTemplate(this.selectedTemplate).subscribe(
            (response) => {
                console.log('Template added successfully:', response);
                Swal.fire({
                  html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Template added successfully.</b>',
                  timer: 2000,
                  position: 'top',
                  customClass: {
                    popup: 'custom-popup-class',
                    title: 'custom-title-class',
                    htmlContainer: 'custom-text-class'
                  },
                  background: '#fff',
                  backdrop: 'rgba(0, 0, 0, 0.4)',
                  showConfirmButton: false
                });
                this.loadTemplates(); 
            },
            (error) => {
                console.error('Error adding email template:', error);
                Swal.fire({
                  html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error adding Email template.</b>',
                  timer: 2000,
                  position: 'top',
                  customClass: {
                    popup: 'custom-popup-class',
                    title: 'custom-title-class',
                    htmlContainer: 'custom-text-class'
                  },
                  background: '#fff',
                  backdrop: 'rgba(0, 0, 0, 0.4)',
                  showConfirmButton: false
                });
            }
        );
  }


//To be completed
sendEmailtoStudent(): void {
  this.selectedTemplate.body = this.editorContent;
  if(this.regNo != null){
    this.emailService.sendEmailsFromStudentProfile(this.selectedTemplate, this.regNo).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          Swal.fire({
            html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Email sent successfully.</b>',
            timer: 2000,
            position: 'top',
            customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-text-class'
            },
            background: '#fff',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            showConfirmButton: false
          });
          this.loadTemplates(); 
        },
        (error) => {
          console.error('Error sending email:', error);
          Swal.fire({
            html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error sending email.</b>',
            timer: 2000,
            position: 'top',
            customClass: {
              popup: 'custom-popup-class',
              title: 'custom-title-class',
              htmlContainer: 'custom-text-class'
            },
            background: '#fff',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            showConfirmButton: false
          });
        }
    );
  }
}


sendEmails(): void {
  this.selectedTemplate.body = this.editorContent;

  // Split the comma-separated email string into an array and specify 'email' as a string
  const emailArray = this.emailAddresses.split(',').map((email: string) => email.trim());
  console.log(emailArray);

  this.emailService.sendEmails(this.selectedTemplate, emailArray).subscribe(
    (response) => {
      console.log('Emails sent successfully:', response);
      Swal.fire({
        html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Emails sent successfully.</b>',
        timer: 2000,
        position: 'top',
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          htmlContainer: 'custom-text-class'
        },
        background: '#fff',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        showConfirmButton: false
      });
      this.loadTemplates(); // Optionally, reload templates to reflect changes
    },
    (error) => {
      console.error('Error sending emails:', error);
      Swal.fire({
        html: '<i class="fas fa-square-xmark" style="font-size: 30px; color: red;"></i><br> <b>Error sending emails.</b>',
        timer: 2000,
        position: 'top',
        customClass: {
          popup: 'custom-popup-class',
          title: 'custom-title-class',
          htmlContainer: 'custom-text-class'
        },
        background: '#fff',
        backdrop: 'rgba(0, 0, 0, 0.4)',
        showConfirmButton: false
      });
    }
  );

}


  


}

