import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthServiceService } from '../../services/Auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatRadioModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
   isRegister=false;

   constructor(public authService: AuthServiceService){}

   registerForm=new FormGroup({
    fullName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)])
  })

   loginForm=new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required])
  })

  handleRegister(){
    console.log("register ", this.registerForm.value)
    this.authService.register(this.registerForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem("jwt", response.jwt)
        this.authService.getUserProfile().subscribe()
        console.log("Signup success", response)
      }
    })
  }

  handleLogin(){
    console.log("login ", this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe({
      next:(response)=>{
        localStorage.setItem("jwt", response.jwt)
        this.authService.getUserProfile().subscribe()
        console.log("login success", response)
      }
    })
  }

  togglePanel(){
    this.isRegister=!this.isRegister
  }
}
