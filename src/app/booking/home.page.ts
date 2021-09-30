import { Component, OnInit,NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController, NavController, ToastController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SearchComponent } from '../_components/search/search.component';
import { InteractionService } from '../_services/interaction.service';
import { HomeDataService } from './home-data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
declare var RazorpayCheckout: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  type:any
  id:any
  amount:any
  darkMode: boolean;
  showPrivacyBanner = true;
  showReminder: boolean;
  offeramount=0
  totalamount:any
  row_data=[]
  celebration=false
  celbr:any
  paymentmethod=false
  bookbutton=true
  paybutton=false
  bookingid:any
  booking_name:any
  booking_address:any

  paymentAmount: number = 333;
  currency: string = 'INR';
  currencyIcon: string = '$';
  razor_key = 'rzp_test_wXHUa0bd5doUNv';
  cardDetails: any = {};

  
  constructor(
    private title: Title,
    private interact: InteractionService,
    private modal: ModalController,
    private toast: ToastController,
    private store: Storage,
    private nav: NavController,
    private router: Router,
    private homeData: HomeDataService,
    private http: HttpClient,
    private zone:NgZone,
    private activeRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.paramMap.get('type')
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    
  }

  ionViewDidEnter() {
    this.type = this.activeRoute.snapshot.paramMap.get('type')
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.loadData(this.type,this.id);
  }

  loadData(type,id) {
    if(type=="doctor"){
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('id', id)
      this.http.post("https://projectnothing.xyz/doctorapp/APIs/selectdoctor.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
      
        this.row_data=[]
        this.zone.run(() => {
          var json=JSON.parse(JSON.stringify(res))
          console.log(json)
          this.amount=json[0].fee
          this.booking_name=json[0].name
          this.booking_address=json[0].address
          this.calculate(this.offeramount)
          var slots=json[0].slots
          var jsonss=slots.split(",");
          this.bookingid=json[0].id
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              slots:jsonss[i]
            })
          }
        });
    
      })
    }
    if(type=="hospital"){
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('id', id)
      this.http.post("https://projectnothing.xyz/doctorapp/APIs/selecthospital.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
      
        this.row_data=[]
        this.zone.run(() => {
          var json=JSON.parse(JSON.stringify(res))
          console.log(json)
          this.amount=json[0].fee
          this.booking_name=json[0].name
          this.booking_address=json[0].address
          this.calculate(this.offeramount)
          var slots=json[0].slot
          var jsonss=slots.split(",");
          this.bookingid=json[0].id
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              slots:jsonss[i]
            })
          }
        });
    
      })
    }
    if(type=="diag"){
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('id', id)
      this.http.post("https://projectnothing.xyz/doctorapp/APIs/selectdiag.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
      
        this.row_data=[]
        this.zone.run(() => {
          var json=JSON.parse(JSON.stringify(res))
          console.log(json)
          this.amount=json[0].fee
          this.booking_name=json[0].name
          this.booking_address=json[0].address
          this.calculate(this.offeramount)
          var slots=json[0].slot
          var jsonss=slots.split(",");
          this.bookingid=json[0].id
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              slots:jsonss[i]
            })
          }
        });
    
      })
    }
    if(type=="clinic"){
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('id', id)
      this.http.post("https://projectnothing.xyz/doctorapp/APIs/selectclinic.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
      
        this.row_data=[]
        this.zone.run(() => {
          var json=JSON.parse(JSON.stringify(res))
          console.log(json)
          this.amount=json[0].fee
          this.booking_name=json[0].name
          this.booking_address=json[0].address
          this.calculate(this.offeramount)
          var slots=json[0].slot
          var jsonss=slots.split(",");
          this.bookingid=json[0].id
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              slots:jsonss[i]
            })
          }
        });
    
      })
    }

  }

  async initSearch() {
    const modal = await this.modal.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  changeUIMode(e) {
    if (e.detail.checked) {
      this.store.set('DARK_UI', true)
        .then(_ => {
          this.interact.setDarkMode(true);
        });
    } else {
      this.store.set('DARK_UI', false)
        .then(_ => {
          this.interact.setDarkMode(false);
        });
    }
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
    });
    toast.present();
  }
  offer(){
    var offer = ((document.getElementById("offer") as HTMLInputElement).value);
    if(offer){
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('type', this.type)
      formData.append('offer', offer)
      this.http.post("https://projectnothing.xyz/doctorapp/APIs/applyoffer.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
       if(res=='NO'){
        this.presentToast('Invalid Coupon Code')
       }
       else{
        var json=JSON.parse(JSON.stringify(res))
        var actualamount=Number(this.percentage(Number(json[0].percentage),Number(this.amount)))
        this.calculate(actualamount)
        //this.celebration=true
        //setTimeout(this.stopcelebration, 3000);
        this.offerdata(offer,actualamount)
       }
  
    
      })
    }
    else{
      this.presentToast('Please enter Coupon Code')
    }

  }
  calculate(offeramount){
    this.zone.run(() => {
      this.offeramount=offeramount
    this.totalamount=Number(this.amount)-offeramount
    })
  }
  percentage(percent, total) {
    return ((percent/ 100) * total).toFixed(2)
  }
  stopcelebration(){
    this.celebration=false
    this.zone.run(() => {
    this.celebration=false
    })
  }
  async offerdata(Coupon,amount) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: Coupon+' Coupon Applied',
      message: 'You Got '+amount+'Rs OFF',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  book(){
    var name = ((document.getElementById("name") as HTMLInputElement).value);
    var phone = ((document.getElementById("phone") as HTMLInputElement).value);
    var address = ((document.getElementById("address") as HTMLInputElement).value);
    var bloodgroup = ((document.getElementById("bloodgroup") as HTMLInputElement).value);
    var slot = ((document.getElementById("slot") as HTMLInputElement).value);

    if(!slot){
      this.presentToast('Please select a desire slot')
    }
    else if(!name || !phone || !address || !bloodgroup){
      this.presentToast('Please fill you details')
    }
    else{
      this.paymentmethod=true
      this.bookbutton=false
      this.paybutton=true
    }
   
  }
  pay(){
    var mode = ((document.getElementById("mode") as HTMLInputElement).value);
    if(!mode){
      this.presentToast('Please select a payment mode')
    }
    else if(mode=='online'){
      this.presentToast('Online Payment Mode Not Available')
      //this.payWithRazor(this.totalamount) 
    }
    else{
      var userid=localStorage.getItem('username')
      var name = ((document.getElementById("name") as HTMLInputElement).value);
      var phone = ((document.getElementById("phone") as HTMLInputElement).value);
      var address = ((document.getElementById("address") as HTMLInputElement).value);
      var bloodgroup = ((document.getElementById("bloodgroup") as HTMLInputElement).value);
      var slot = ((document.getElementById("slot") as HTMLInputElement).value);
      //var newDate = new Date();
      var datee = new Date().toLocaleDateString();
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('userid', userid)
      formData.append('patientname', name)
      formData.append('patientphone', phone)
      formData.append('patientaddress', address)
      formData.append('bloodgroup', bloodgroup)
      formData.append('slot', slot)
      formData.append('date', datee)
      formData.append('bookingtype', this.type)
      formData.append('bookingid', this.bookingid)
      formData.append('payemnetmode', 'offline')
      formData.append('transsactionid', 'N/A')
      formData.append('totalamout', this.amount)
      formData.append('offeramount', String(this.offeramount))
      formData.append('payableamount', this.totalamount)
      formData.append('booking_name', this.booking_name)
      formData.append('booking_address', this.booking_address)


      this.http.post("https://projectnothing.xyz/doctorapp/APIs/booking.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        console.log(res)
      if(res){
        console.log('hi')
          this.router.navigateByUrl('/bill/'+res);
        //this.popup("Your booking Succesfull")
      }
     else{
        this.popup("something went Wrong")
      }
    
      })
    }

  }
  payWithRazor(amount) {
    var options = {
      description: 'BOOKING',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: this.currency,
      key: this.razor_key,
      amount: amount,
      name: 'APP NAME',
      prefill: {
        email: 'sanjibanroy53@gmail.com',
        contact: '8399034149',
        name: 'Sanjiban'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    var successCallback = function (payment_id) {
      var userid=localStorage.getItem('username')
      var name = ((document.getElementById("name") as HTMLInputElement).value);
      var phone = ((document.getElementById("phone") as HTMLInputElement).value);
      var address = ((document.getElementById("address") as HTMLInputElement).value);
      var bloodgroup = ((document.getElementById("bloodgroup") as HTMLInputElement).value);
      var slot = ((document.getElementById("slot") as HTMLInputElement).value);
      //var newDate = new Date();
      var datee = new Date().toLocaleDateString();
      const formData = new FormData();
      formData.append('token', 'ZXYlmPt6OpAmaLFfjkdjldfjdlM')
      formData.append('userid', userid)
      formData.append('patientname', name)
      formData.append('patientphone', phone)
      formData.append('patientaddress', address)
      formData.append('bloodgroup', bloodgroup)
      formData.append('slot', slot)
      formData.append('date', datee)
      formData.append('bookingtype', this.type)
      formData.append('bookingid', this.bookingid)
      formData.append('payemnetmode', 'online')
      formData.append('transsactionid', payment_id)
      formData.append('totalamout', this.amount)
      formData.append('offeramount', String(this.offeramount))
      formData.append('payableamount', this.totalamount)
      formData.append('booking_name', this.booking_name)
      formData.append('booking_address', this.booking_address)

      this.http.post("https://projectnothing.xyz/doctorapp/APIs/booking.php", formData)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe(res => {
        console.log(res)
      if(res){
        this.router.navigateByUrl('/bill/'+res);
        //this.popup("Your booking Succesfull")
      }
     else{
        this.popup("something went Wrong")
      }
    
      })
    };

    var cancelCallback = function (error) {
      this.popup('Error ' + error.code +' If money debited from account it will be credited with 72 hours')
     // alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

  async popup(messgae) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      // subHeader: Coupon+' Coupon Applied',
      message: messgae,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

 

}
