import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginSingupService } from 'src/app/services/login-singup.service';
import { faEye, faEyeSlash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  ChangePswdStatus: boolean | undefined;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  UpperCaseRegex = /(.*[A-Z].*)/;
  LowerCaseRegex = /(.*[a-z].*)/;
  NumberRegex = /(.*\d.*)/;
  public mask = [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  OldPswType: boolean = false;
  NewPsw1Type: boolean = false;
  NewPsw2Type: boolean = false;

  constructor(private _UserAuth: LoginSingupService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.UpperCaseCheck("FAHAD")
  }

  UserChangePassword(passData: any) {
    this.ChangePswdStatus = false;
    this._UserAuth.ChangePassowrd(passData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.ChangePswdStatus = true;
      },
      (badResponse) => {
        this.ChangePswdStatus = true;
        console.log(badResponse)
      }
    )
  }

  toggleoldPassword() {
    this.OldPswType = !this.OldPswType;
  }
  toggleNew1dPassword() {
    this.NewPsw1Type = !this.NewPsw1Type;
  }
  toggleNew2dPassword() {
    this.NewPsw2Type = !this.NewPsw2Type;
  }

  UpperCaseCheck(Value: any) {
    return this.UpperCaseRegex.test(Value);
  }
  LowerCaseCheck(Value: any) {
    return this.LowerCaseRegex.test(Value);
  }
  NumberCheck(Value: any) {
    return this.NumberRegex.test(Value);
  }
}

