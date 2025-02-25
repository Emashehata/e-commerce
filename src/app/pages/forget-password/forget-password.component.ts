import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
        step:number = 1;
        isLoading:boolean=false;

        private readonly authService=inject(AuthService);
        private readonly router=inject(Router);

        verfiyEmail:FormGroup = new FormGroup({
          email: new FormControl ( null ,[Validators.required,Validators.email]),
        })


        verfiyCode:FormGroup = new FormGroup({
            resetCode:new FormControl ( null ,[Validators.required,Validators.pattern(/^[0-9]{5,}$/)])
          })


        resetPassword:FormGroup = new FormGroup({
          email: new FormControl( null , [Validators.required,Validators.email]),
          newPassword: new FormControl( null ,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
        })



        SumbitVerifyEmail():void{
            let emailValue =  this.verfiyEmail.get('email')?.value;
            this.resetPassword.get('email')?.patchValue(emailValue);
            this.authService.setEmailVerfiy(this.verfiyEmail.value).subscribe({
              next:(res)=>{
                  console.log(res);
                  if(res.statusMsg === 'success')
                    this.step = 2;

              },
              error:(err)=>{
                console.log(err);

              }
            })
        }


        SumbitVerifyCode():void{
            this.authService.setCodeVerfiy(this.verfiyCode.value).subscribe({
              next:(res)=>{
                  console.log(res);
                  if(res.status === 'Success')
                    this.step= 3;

              },
              error:(err)=>{
                console.log(err);

              }
            })
        }



        SumbitNewPassword():void{
            this.authService.setNewPassword(this.resetPassword.value).subscribe({
              next:(res)=>{
                  console.log(res);
                  localStorage.setItem('user token',res.token);
                  this.authService.saveUserData();
                  this.router.navigate(['/home'])

              },
              error:(err)=>{
                console.log(err);

              }
            })
        }
}
