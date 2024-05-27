import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { UserService } from '../../../services/UserServices/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink, MdbFormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit{

  userLogForm: FormGroup;

  alertMessage: string='';
  alertType: number=0;

  constructor(public service: UserService, private builder: FormBuilder, private loc: Location){

  }

  ngOnInit(): void {
    this.userLogForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    })
  }

  submitForm(){
    if(this.userLogForm.valid){
      this.service.loginUser({email: this.userLogForm.get('email')?.value, password: this.userLogForm.get('password')?.value}).subscribe({
        next: (result) => {
          if(result.token){
            this.service.activateToken(result);
            this.alertMessage = 'SUCCESS!';
            this.alertType = 0;
            setTimeout(() => {
              this.loc.back();
            }, 1000);
          }else{
            this.alertMessage = result.message;
            this.alertType = 1;
          }
        },
        error: (err) => {
          console.log(err);
          this.alertMessage = err.error.message;
          this.alertType = 2;
        }
      })
    }else{
      alert("NUH-UH!");
    }
  }

}
