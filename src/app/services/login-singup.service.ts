import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSingupService {

  Endpoint = environment.baseUrl
  FetchTokeURL = `${this.Endpoint}api/security/token`;
  GetUserUrl = `${this.Endpoint}api/v1/customer/profile`;
  FetchCountryURl = `${this.Endpoint}api/v1/en/countries`;
  FetchCitiesURl = `${this.Endpoint}api/v1/en/country/1/cities`;
  UserProfileImageUrl = `${this.Endpoint}api/v1/customer/profile/photo`;
  RequestAllURL = `${this.Endpoint}api/v1/customer/Requests`;
  access_token: any;
  Lang:any;

  constructor(private http: HttpClient) {
  }

  FetchToken(LoginData: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    const body = new HttpParams()
      .set(`grant_type`, 'password')
      .set(`username`, LoginData.UserName)
      .set(`password`, LoginData.Password)
      .set(`deviceId`, '3f72749e22ac209-1')
      .set(`type`, 'Customer');
    return this.http.post(this.FetchTokeURL, body, TypeOf)
  }

  SingUpUsers(SingupData: any) {
    let SingupUsersURL = `${this.Endpoint}api/v1/signup?lang=${environment.Language}`;
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "UserName": SingupData.UserName,
      "Email": SingupData.Email,
      "Contact": '971' + SingupData.Contact.replace('_', '').trim(),
      "Password": SingupData.Password,
    }
    return this.http.post(SingupUsersURL, body, TypeOf);
  }

  ForgotPassword(ForgotData: any) {

    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "EmailAddress": ForgotData.ForgotUserName
    }
    
    let ForgotURL = `${this.Endpoint}api/v1/forgotpassword?lang=${environment.Language}`;
    return this.http.post(ForgotURL, body, TypeOf);
  }

  Careers(CareersData: any, fileToUpload: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    let body = {
      "Name": CareersData.UserName,
      "Gender": CareersData.Gender,
      "DateOfBirth": CareersData.DateOfBirth,
      "Education": CareersData.education,
      "Position": CareersData.position,
      "Experience": CareersData.experience
    }
    
    let CareersURL = `${this.Endpoint}api/v1/careers?lang=${environment.Language}`;
    let formData = new FormData();
    formData.append('CV', fileToUpload)
    formData.append('Career', JSON.stringify(body));

    return this.http.post(CareersURL, formData);
  }

  ContactUs(ContactData: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body = {
      "Name": ContactData.Name,
      "Email": ContactData.Email,
      "Contact": '971' + ContactData.Contact,
      "Subject": ContactData.Subject,
      "Message": ContactData.Message
    }
    let ContactUsURL = `${this.Endpoint}api/v1/ContactUs?lang=${environment.Language}`;
    return this.http.post(ContactUsURL, body, TypeOf);
  }

  GetUserProfile(access_token: string) {
    this.access_token = access_token;
    const TypeOf = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.access_token}`) }
    return this.http.get(this.GetUserUrl, TypeOf);
  }

  SubmitOTP(otp: any, contat: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "Contact": contat.length <= 12 ? contat : '971' + contat,
      "otp": otp
    }
    let OtpURL = `${this.Endpoint}api/v1/otpverification?lang=${environment.Language}`;
    return this.http.post(OtpURL, body, TypeOf);
  }

  ReSendOTP(contat: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    let OtpResendURL = `${this.Endpoint}api/v1/resendotp/${contat}?lang=${environment.Language}`;
    return this.http.post(OtpResendURL, TypeOf);
  }

  ContactVerification(email: any, password: any) {
    let ContactVerificationUrl = `${this.Endpoint}api/v1/customer/contact?lang=${environment.Language}`;
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "emailaddress": email,
      "Password": password
    }
    return this.http.post(ContactVerificationUrl, body, TypeOf);
  }

  VendorRegistration(VendorData: any) {
    const TypeOf = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    const body: any = {
      "Name": VendorData.VendorUserName,
      "Email": VendorData.VendorEmail,
      "Contact": '971' + VendorData.VendorContact,
      "Password": VendorData.VendorPassword
    }
    let VendorAccURL = `${this.Endpoint}api/v1/vendor/register?lang=${environment.Language}`;
    return this.http.post(VendorAccURL, body, TypeOf);
  }


  ChangePassowrd(passData: any) {
    const body: any = {
      "CurrentPassword": passData.oldPassword,
      "NewPassword": passData.newPassword,
      "ConfirmPassword": passData.confirmNewPassword,
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    let ChangePasswordUrl = `${this.Endpoint}api/v1/customer/changepassword?lang=${environment.Language}`;
    return this.http.post(ChangePasswordUrl, body, TypeOf);
  }

  FetchCountries() {
    return this.http.get(this.FetchCountryURl)
  }

  FetchCities() {
    return this.http.get(this.FetchCitiesURl)
  }

  UserProfileUpdate(userData: any) {
    let UserProfileUpdateUrl = `${this.Endpoint}api/v1/customer/profile?lang=${environment.Language}`;
    const body: any = {
      "name": userData.firstName + ' ' + userData.lastName,
      "email": userData.email,
      "contact": 971+userData.phone,
      "address": userData.address,
    }
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    return this.http.put(UserProfileUpdateUrl, body, TypeOf)
  }

  profileImageUpload(image: any) {

    let formData = new FormData();
    formData.append('VoiceMessage', image)
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
    }
    return this.http.put(this.UserProfileImageUrl, formData, TypeOf)
  }

  logOut() {
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    let logOutUrl = `${this.Endpoint}api/v1/logout?lang=${environment.Language}`;
    return this.http.post(logOutUrl, {}, TypeOf)
  }

  FetchAllRequest() {
    const TypeOf = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.access_token}`) }
    return this.http.get(this.RequestAllURL, TypeOf);
  }

  FetchEachRequest(id: any, mode: any) {
    const url = `${this.Endpoint}api/v1/${mode}/Request/${id}`
    const TypeOf = { headers: new HttpHeaders().set('Authorization', `Bearer ${this.access_token}`) }
    return this.http.get(url, TypeOf);

  }

  ClosedRequest(id: any, mode: any) {
    const url = `${this.Endpoint}api/v1/${mode}/Request/${id}/close`
    const TypeOf = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.access_token}`)
        .set('Content-Type', 'application/json')
    }
    return this.http.put(url, {}, TypeOf);
  }
}
