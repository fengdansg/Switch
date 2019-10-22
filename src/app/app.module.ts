import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login-page/login-page";
import {TabPage} from "../pages/tab-page/tab-page";
import {AnalyticsPage} from "../pages/analytics-page/analytics-page";
import {Data} from "../providers/data";
import {RankingPage} from "../pages/ranking-page/ranking-page";
import {IncentivePage} from "../pages/incentive-page/incentive-page";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {SignupPage} from "../pages/signup-page/signup-page";
import {SettingPage} from "../pages/setting-page/setting-page";
import {PaymentPage} from "../pages/payment-page/payment-page";
import {BillPage} from "../pages/bill-page/bill-page";
import {ProfilePage} from "../pages/profile-page/profile-page";
import {TipsPage} from "../pages/tips-page/tips-page";
import {FAQPage} from "../pages/faq-page/faq-page";
import {NotificationPage} from "../pages/notification-page/notification-page";
import {AddPaymentPage} from "../pages/add-payment-page/add-payment-page"
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import {FeedbackPage} from "../pages/feedback/feedback";
import {ContactPage} from "../pages/contact/contact";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {SwitchsPage} from "../pages/switchs/switchs";
import {SearchSwitchsPage} from "../pages/search-switchs/search-switchs";
import {MonitorBar} from "../components/monitor-bar/monitor-bar";
import {ProgressBar} from "../components/progress-bar/progress-bar";
import {SwitchAnalyticPage} from "../pages/switch-analytic/switch-analytic";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabPage,
    AnalyticsPage,
    RankingPage,
    IncentivePage,
    SignupPage,
    SettingPage,
    PaymentPage,
    BillPage,
    ProfilePage,
    TipsPage,
    FAQPage,
    NotificationPage,
    AddPaymentPage,
    FeedbackPage,
    ContactPage,
    SwitchsPage,
    SearchSwitchsPage,
    SwitchAnalyticPage,
    ProgressBar,
    MonitorBar
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabPage,
    //MonitoringPage,
    //SchedulePage,
    AnalyticsPage,
    // RoomlistPage,
    RankingPage,
    IncentivePage,
    SignupPage,
    SettingPage,
    PaymentPage,
    BillPage,
    ProfilePage,
    TipsPage,
    FAQPage,
    NotificationPage,
    AddPaymentPage,
    FeedbackPage,
    ContactPage,
    SwitchsPage,
    SearchSwitchsPage,
    SwitchAnalyticPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Data,
    SmartAudioProvider,
    NativeAudio,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
