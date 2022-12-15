import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareersComponent } from './components/careers/careers/careers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FillAdsDetailsComponent } from './placeyouradds/placeyouradds/fill-ads-details/fill-ads-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlaceYourOrderComponent } from './placeyouradds/placeyouradds/place-your-order/place-your-order.component';
import { SelectCategoryAdsComponent } from './placeyouradds/placeyouradds/select-category-ads/select-category-ads.component';
import { FaqspageComponent } from './faqs/faqspage/faqspage.component';
import { AboutusPageComponent } from './m-aboutus/aboutus-page/aboutus-page.component';
import { BlogComponent } from './m-blogs/blog/blog.component';
import { BlogsComponent } from './m-blogs/blogs/blogs.component';
import { ChangePasswordComponent } from './m-dashboard/change-password/change-password.component';
import { DashboardPageComponent } from './m-dashboard/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './m-dashboard/profile-page/profile-page.component';
import { PropertiesfilterPageComponent } from './m-properties-filter/propertiesfilter-page/propertiesfilter-page.component';
import { PropertieshomeComponent } from './m-properties/propertieshome/propertieshome.component';
import { PropertydetailComponent } from './m-property/propertydetail/propertydetail.component';
import { PageNotFound } from './static-pages/page-not-found/page-not-found.component';
import { PrivacyComponent } from './static-pages/privacy/privacy.component';
import { TermsComponent } from './static-pages/terms/terms.component';
import { VehicleComponent } from './vehicle/home/vehicle/vehicle.component';
import { VehicledetailsComponent } from './vehicledetails/vehicledetails.component';
import { VehiclefilterComponent } from './vehiclefilter/vehiclefilter.component';
import { WishlistpageComponent } from './wishlist/wishlistpage/wishlistpage.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { CustomersupportComponent } from './static-pages/customersupport/customersupport.component';
import { AboutusComponent } from './mobilepages/aboutus/aboutus.component';
import { CustomersupportComponentMobile } from './mobilepages/customersupport/customersupport.component';
import { FaqComponent } from './mobilepages/faq/faq.component';
import { PrivacyComponentMobile } from './mobilepages/privacy/privacy.component';
import { TermsandconditionComponent } from './mobilepages/termsandcondition/termsandcondition.component';
import { ComparisonComponent } from '../app/comparison/comparison.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusPageComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'Properties', component: PropertieshomeComponent },
  { path: 'properties/filter', component: PropertiesfilterPageComponent },
  { path: 'property/:slug', component: PropertydetailComponent },
  { path: 'placeyouradd', component: PlaceYourOrderComponent },
  { path: 'selectcategoryads', component: SelectCategoryAdsComponent },
  { path: 'filladsdetails', component: FillAdsDetailsComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'myprofile', component: ProfilePageComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/:slug', component: BlogComponent },
  { path: 'Vehicle', component: VehicleComponent },
  { path: 'vehicle/filter', component: VehiclefilterComponent },
  { path: 'vehicles/:slug', component: VehicledetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faqs', component: FaqspageComponent },
  { path: 'wishlist', component: WishlistpageComponent },
  { path: 'vendor/list', component: VendorListComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'CustomerSupport', component: CustomersupportComponent },
  // Mobile Pages
  { path: 'aboutus_mb', component: AboutusComponent },
  { path: 'CustomerSupport_mb', component: CustomersupportComponentMobile },
  { path: 'faqs_mb', component: FaqComponent },
  { path: 'privacy_mb', component: PrivacyComponentMobile },
  { path: 'terms_mb', component: TermsandconditionComponent },
  { path: 'comparison/:type/:selectId/:compareId', component: ComparisonComponent },
  {
    path: '**', pathMatch: 'full', component: PageNotFound
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
