import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { matchPasswords } from './Validators/passwords.match';
import { UserService } from '../../../services/UserServices/user.service';
import { User } from '../../../types/user.type';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ ReactiveFormsModule, MdbFormsModule, CommonModule,
    RouterLink, UpperCasePipe, 
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
  providers: [UserService, UserLoginComponent, RouterLink]
})
export class UserRegistrationComponent implements OnInit{

  step: number = 1;
  showPswd1: boolean = false;
  showPswd2: boolean = false;

  alertMessage: string='';
  alertType: number=0;

  userRegForm: FormGroup;

  constructor(private builder: FormBuilder, private service: UserService){

  }

  ngOnInit(): void {
    const patternForWords = '^[A-Za-z]*$';
    this.userRegForm = this.builder.group({
      userDetails: this.builder.group({
      name: ['', [Validators.required, Validators.pattern(patternForWords)]],
      surname: ['',[Validators.required, Validators.pattern(patternForWords)]],
      email: ['',[Validators.required, Validators.email]]
      }),
      addressDetails: this.builder.group({
      address: ['', [Validators.required, Validators.pattern(patternForWords)]],
      city: ['', [Validators.required, Validators.pattern(patternForWords)]],
      state: ['', [Validators.required, Validators.pattern(patternForWords)]]
      }),
      passwordDetails: this.builder.group({
      pin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*\d).{8,}$/)]]
      },
      {
        validators: [matchPasswords],
      }  
      )
    })
  }

  nextPage(){
    const userDetailsGroup = this.userRegForm.get('userDetails') as FormGroup;
    const addressDetailsGroup = this.userRegForm.get('addressDetails') as FormGroup;

    if(userDetailsGroup.valid && this.step === 1){
      this.step++;
    }
    else if(addressDetailsGroup.valid && this.step === 2){
      this.step++;
    }else alert("NUH-UH!");
  }

  previousPage(){
    this.step--;
  }

  showPassword(id: number){
    if(id === 1){
      this.showPswd1 = !this.showPswd1;
    }else this.showPswd2 = !this.showPswd2;
  }
  

  submitForm(){
      const passwordDetails = this.userRegForm.get('passwordDetails') as FormGroup;

      if(passwordDetails.valid){
        const user: User ={
          name: this.userRegForm.get('userDetails.name')?.value,
          surname: this.userRegForm.get('userDetails.surname')?.value,
          address: this.userRegForm.get('addressDetails.address')?.value,
          city: this.userRegForm.get('addressDetails.city')?.value,
          state: this.userRegForm.get('addressDetails.state')?.value,
          pin: passwordDetails.get('pin')?.value,
          email: this.userRegForm.get('userDetails.email')?.value,
          password: passwordDetails.get('password')?.value
        }

        console.log(user);

        this.service.createUser(user).subscribe({
          next: (result) =>{
            if(result.message === 'success'){
              this.alertMessage = 'SUCCESS!';
              this.alertType = 0;
            }else if(result.message === 'Email already exists!'){
              this.alertMessage = result.message;
              this.alertType = 1;
            }
          },
          error: (err) => {
            this.alertMessage = err.error.message;
            this.alertType = 2;
          }
        })
      }else{
        alert("NOT VALID");
      }
  }

}
