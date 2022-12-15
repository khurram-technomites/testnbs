import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginSingupService } from 'src/app/services/login-singup.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  faCamera = faCamera;

  customer: any;
  profileName: any;
  countries: any;
  cities: any;
  access_token: any;
  profileImage: any;
  SignupContact: any;
  showOPTcounter: any;
  Contact: any;

  firstName: any = 'First Name';
  lastName: any = 'Last Name';
  email: any = 'Enter Your Email';
  phone: any = 'Enter Your Phone';
  address: any = 'Enter Your Address';
  
  selectedFile!: File;
  UpdateProfileStatus: Boolean | undefined;
  ShowOTP: boolean = false;
  isTimeOut: boolean = false;
  

  constructor(private _UserAuth: LoginSingupService, private router: Router, private toastr: ToastrService) {
    this.access_token = localStorage.getItem('access_token');
    if (this.access_token) {
    }
    else {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {
    this.GetUserProfile()
    this.GetCountries()
    this.GetCities()
  }

  GetUserProfile() //get user profile
  {
    this._UserAuth.GetUserProfile(this.access_token).subscribe(
      (response: any) => {
        this.firstName = response.customer.name
        this.customer = response.customer.name
        if (this.customer) {
          this.profileName = this.customer.split(" ");
          this.firstName = this.profileName[0]
          this.lastName = this.profileName[1]
        }
        this.email = response.customer.email
        this.phone = response.customer.contact.slice(3)
        this.address = response.customer.address
        this.profileImage = response.customer.logo
      }
    )
  }

  GetCountries() {
    this._UserAuth.FetchCountries().subscribe(
      (response: any) => {
        this.countries = response.countries
      }
    )
  }

  GetCities() {
    this._UserAuth.FetchCities().subscribe(
      (response: any) => {
        this.cities = response.cities
      }
    )
  }

  UserProfileUpdate(userData: any) {
    this.UpdateProfileStatus = false;
    this._UserAuth.UserProfileUpdate(userData).subscribe((response: any) => {
      if(response.isNumberChanged == true)
      {
        this.ShowOTP = true;
        this.SignupContact = 971+userData.phone
      }
      this.toastr.success(response.message);
      this.UpdateProfileStatus = true;
    }),
      (badResponse: any) => {
        this.UpdateProfileStatus = true;
        console.log(badResponse)
      }
  }

  getProfileImage(profileImage: any) {
    profileImage.click()
    profileImage.onchange = () => {
      const selectedFile = profileImage.files[0]
      this._UserAuth.profileImageUpload(selectedFile).subscribe((response: any) => {
        this.profileImage = response.image
        this.toastr.success(response.message);
        var x = document.getElementById("profileId")
        var typ = document.createAttribute("src");
        typ.value = this.profileImage
        x!.attributes.setNamedItem(typ);
      }),
        (badResponse: any) => {
          console.log(badResponse)
        }
    }
  }

  restrictAlphabets(e: any) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
      return true;
    else
      return false;
  }

  SendOTP(OtpData: any) {
    this.Contact = this.SignupContact;
    this.otpCounter(120)
    
    let otp = OtpData.OTP1 + OtpData.OTP2 + OtpData.OTP3 + OtpData.OTP4;
    this._UserAuth.SubmitOTP(otp, this.Contact).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        if (response.status == "success") {
          this.ShowOTP = false;
        }
      })
  }

  reSendOTP() {
    this._UserAuth.ReSendOTP(this.Contact).subscribe(
      (response: any) => {
        this.toastr.success(response.message);

      })
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
}
