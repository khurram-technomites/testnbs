import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginSingupService } from 'src/app/services/login-singup.service';
import { environment } from 'src/environments/environment';
import { faEye, faEyeSlash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Language: string = environment.Language;

  @Input() LoginAndSingupPopup: any;
  @Input() form: any;
  @Input() activeLogin: any;
  @Input() activeSignup: any;
  @Input() backRouter: any;

  @Output() popUpChanged: EventEmitter<any> = new EventEmitter();
  @Output() logedIn: EventEmitter<any> = new EventEmitter();

  showOPTcounter: any;
  customer: any;
  customerImage: any;
  Contact: any;
  SignupContact: any;
  
  LoginPasswordType: boolean = false;
  SignUp1PasswordType: boolean = false;
  SignUp2PasswordType: boolean = false;
  isTimeOut: boolean = false;
  showProfileName: boolean = false;
  SignUpVendor1PasswordType: boolean = false;
  SignUpVendor2PasswordType: boolean = false;
  OTP: boolean = true;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  signInStatus: boolean | undefined;
  ForgotStatus: boolean | undefined;
  SignUpStatus: boolean | undefined;
  SignUpVendorStatus: boolean | undefined;
  
  UpperCaseRegex = /(.*[A-Z].*)/;
  LowerCaseRegex = /(.*[a-z].*)/;
  NumberRegex = /(.*\d.*)/;
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  
  constructor(private router: Router, private _UserAuth: LoginSingupService, private toastr: ToastrService) {
    this.form = 'OTP';
    this.Language = (environment.Language == 'ar') ? 'text-right' : ''
  }

  ngOnInit(): void {
  }

  getUserLoginData(LoginData: any) //login function
  {
    this.signInStatus = false;
    this._UserAuth.FetchToken(LoginData).subscribe(
      
      (response: any) => {
        this.signInStatus = true;
        localStorage.setItem('access_token', response.access_token)
        this.toastr.success('Successfully Login');
        this.GetUserProfile();
        this.showProfileName = true;
        setTimeout(() => {
          this.logedIn.emit({ "showProfileName": this.showProfileName, "customer": this.customer, "customerImage": this.customerImage });
          this.Close();
        }, 1000);
        // saeed over write fahad bhai code
        if(this.backRouter)
        {
          this.router.navigateByUrl('/placeyouradd')
        }
        else
        {
          this.router.navigate(['dashboard'], { queryParams: { type: 'myprofile' } });
        }
        // saeed code end
        this.LoginAndSingupPopup = false;
        if (LoginData.RememberCheckBox) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }
        localStorage.setItem('remember_me', LoginData.RememberCheckBox);
      },
      (badResponse: any) => {
        this.signInStatus = true;
        this.toastr.error(badResponse.error.error_description);
        if (badResponse.error.error_description == "Verify your contact number before login!") {
          this.toggleLoginSignUp("OTP");
          this.ContactVerify(LoginData);
          this.otpCounter(120);
        }
      }
    )
  }

  ForgotPassword(ForgotData: any) {
    this.ForgotStatus = false;
    this._UserAuth.ForgotPassword(ForgotData).subscribe(
      (response: any) => {
        this.ForgotStatus = true;
        this.toastr.success(response.message);
        if (response.status == "success") {
          this.form = "Login";
        }
      }), (badResponse: any) => {
        this.ForgotStatus = true;
        this.toastr.error(badResponse.status);
      }
  }

  async GetUserProfile() //get user profile
  {
    const access_token: any = localStorage.getItem('access_token');
    this._UserAuth.GetUserProfile(access_token).subscribe(
      (response: any) => {
        this.customer = response.customer.name;//response.customer;
        this.customerImage = response.customer.logo;
      }
    )
  }

  getUserFormData(SingUpData: any) //singup function
  {
    this.SignUpStatus = false;
    this.Contact = '971' + SingUpData.Contact;
    this._UserAuth.SingUpUsers(SingUpData).subscribe(
      (response: any) => {
        this.SignUpStatus = true;
        this.toastr.success(response.message);
        if (response.status != "Failed") {
          this.SignupContact = '971' + SingUpData.Contact.replace('_', '').trim()
          this.form = 'OTP';
        }
        this.OTP = false;
        this.otpCounter(120);
      }
    ), (badResponse: any) => {
      this.SignUpStatus = true;
      this.toastr.error(badResponse.status);
    }
  }

  SendOTP(OtpData: any) {
    let otp = OtpData.OTP1 + OtpData.OTP2 + OtpData.OTP3 + OtpData.OTP4;
    this._UserAuth.SubmitOTP(otp, this.Contact).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        if (response.status == "success") {
          this.form = "Login";
          this.toggleLoginSignUp(this.form);
        }
      })
  }

  reSendOTP() {
    this._UserAuth.ReSendOTP(this.Contact).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.isTimeOut = false;
        this.otpCounter(120);
      })
  }

  ContactVerify(LoginData: any) {

    this._UserAuth.ContactVerification(LoginData.UserName, LoginData.Password).subscribe(
      (response: any) => {
        this.Contact = response.message;
        this.SignupContact = response.message;
      }
    ), (badResponse: any) => {
      this.toastr.error(badResponse.status);
    }
  }

  RegisterVendor(VendorData: any) {
    this.SignUpVendorStatus = false;
    this._UserAuth.VendorRegistration(VendorData).subscribe(
      (response: any) => {
        this.SignUpVendorStatus = true;
        this.toastr.success(response.message);
        if (response.status == "success") {
          this.form = "";
          this.Close();
        } else {
          this.SignUpVendorStatus = true;
        }
      }, (badResponse: any) => {
        this.SignUpVendorStatus = true;
        this.toastr.error(badResponse.error.message);
      })
  }

  toggleLoginSignUp(value: string) {
    this.form = value;
    this.activeLogin = this.form == 'Login' ? 'border-b-4 border-gk-red' : '';
    this.activeSignup = this.form == 'SignUp' ? 'border-b-4 border-gk-red' : '';
  }

  keytest(data: any) {
    if (data.key !== 'Backspace') {
      data.target.nextElementSibling.focus();
    }
    else {
      data.target.previousElementSibling.focus()
    }
  }

  otpCounter(remaining: any) {
    let m: any = Math.floor(remaining / 60);
    let s: any = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    this.showOPTcounter = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
      setTimeout(() => {
        this.otpCounter(remaining);
      }, 1000);
      return;
    }
    this.isTimeOut = true;
  }

  Close() {
    this.LoginAndSingupPopup = false;
    this.popUpChanged.emit(this.LoginAndSingupPopup);
  }

  toggleLoginPasswordType() {
    this.LoginPasswordType = !this.LoginPasswordType;
  }

  toggleSignup1PasswordType() {
    this.SignUp1PasswordType = !this.SignUp1PasswordType;
  }
  toggleSignup2PasswordType() {
    this.SignUp2PasswordType = !this.SignUp2PasswordType;
  }
  toggleSignupVendor1PasswordType() {
    this.SignUpVendor1PasswordType = !this.SignUpVendor1PasswordType;
  }
  toggleSignupVendor2PasswordType() {
    this.SignUpVendor2PasswordType = !this.SignUpVendor2PasswordType;
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
  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
      return true;
    else
      return false;
  }
}
