import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: './welcome/welcome.module#WelcomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountPageModule'
  },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#SchedulePageModule'
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsPageModule'
  },
  {
    path: 'marketplace',
    loadChildren: './marketplace/marketplace.module#MarketplacePageModule'
  },
  {
    path: 'notifications',
    loadChildren: './notifications/notifications.module#NotificationsPageModule'
  },
  {
    path: 'videos',
    loadChildren: './videos/videos.module#VideosPageModule'
  },
  {
    path: 'assistant',
    loadChildren: './assistant/assistant.module#AssistantPageModule'
  },
  {
    path: 'referrals',
    loadChildren: './referrals/referrals.module#ReferralsPageModule'
  },
  {
    path: 'wallet',
    loadChildren: './wallet/wallet.module#WalletPageModule'
  },
  {
    path: 'doctor',
    loadChildren: './doctor/home.module#HomePageModule'
  },
  {
    path: 'locationresult/:id',
    loadChildren: './locationresult/home.module#HomePageModule'
  },
  
  {
    path: 'allapointment',
    loadChildren: './allapointment/home.module#HomePageModule'
  },
  {
    path: 'booking/:id/:type/:time',
    loadChildren: './booking/home.module#HomePageModule'
  },
  {
    path: 'allprofiles/:id/:type/:time',
    loadChildren: './allprofiles/home.module#HomePageModule'
  },
  
  {
    path: 'bill/:userid',
    loadChildren: './bill/home.module#HomePageModule'
  },
  {
    path: 'diag',
    loadChildren: './diag/home.module#HomePageModule'
  },
  {
    path: 'hospital',
    loadChildren: './hospital/home.module#HomePageModule'
  },
  {
    path: 'clinic',
    loadChildren: './clinic/home.module#HomePageModule'
  },
  {
    path: 'feedback',
    loadChildren: './feedback/home.module#HomePageModule'
  },
  {
    path: 'offer',
    loadChildren: './offer/home.module#HomePageModule'
  },
  {
    path: 'ht',
    loadChildren: './ht/home.module#HomePageModule'
  },
  {
    path: 'ht_details/:id',
    loadChildren: './ht_details/home.module#HomePageModule'
  },
  {
    path: 'per_blog',
    loadChildren: './per_blog/home.module#HomePageModule'
  },
  {
    path: 'blog/:id',
    loadChildren: './blog/home.module#HomePageModule'
  },
  {
    path: 'blog1/:id',
    loadChildren: './blog1/home.module#HomePageModule'
  },
  {
    path: 'blogs/:id',
    loadChildren: './blogs/home.module#HomePageModule'
  },
  {
    path: 'doctorprofile/:id/:time',
    loadChildren: './doctorprofile/home.module#HomePageModule'
  },
  { 
    path: '**', 
    loadChildren: './error/error.module#ErrorPageModule' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
