import { Component, OnInit,NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SearchComponent } from '../_components/search/search.component';
import { InteractionService } from '../_services/interaction.service';
import { HomeDataService } from './home-data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id:any
  darkMode: boolean;
  showPrivacyBanner = true;
  showReminder: boolean;
  name:any;
  registration:any
  fee:any;
  about:any;
  language:any;
  address:any
  email:any
  contact:any
  row_data=[]
  type:any
  headername:any


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
  ) { }

  ngOnInit() {
    this.title.setTitle('Doctor Dashboard');
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.type = this.activeRoute.snapshot.paramMap.get('type')
  }

  ionViewDidEnter() {
    this.store.get('DARK_UI').then((mode) => this.darkMode = mode ? true : false);
    this.store.get('BANN_PRIVACY').then((show) => this.showPrivacyBanner = show !== 'N' ? true : false);
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.type = this.activeRoute.snapshot.paramMap.get('type')
    this.loadData(this.id,this.type);
  }

  loadData(id,type) {
    if(type=='clinic'){
    this.headername='Clinic'
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
        this.name=json[0].name
        this.registration=json[0].registration
        this.fee=json[0].fee
        this.about=json[0].about
        this.email=json[0].email
        this.contact=json[0].phone
        this.address=json[0].address
        var language=json[0].language
        var jsonss=language.split(",");
        for(var i=0; i<jsonss.length;i++){
          this.row_data.push({
            language:jsonss[i]
          })
        }
      });
  
    });
    }
    if(type=='diag'){
      this.headername='Diagnostic'
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
          this.name=json[0].name
          this.registration=json[0].registration
          this.fee=json[0].fee
          this.about=json[0].about
          this.email=json[0].email
          this.contact=json[0].phone
          this.address=json[0].address
          var language=json[0].language
          var jsonss=language.split(",");
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              language:jsonss[i]
            })
          }
        });
    
      });

    }

    if(type=='hospital'){

      this.headername='Hospital'
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
          this.name=json[0].name
          this.registration=json[0].registration
          this.fee=json[0].fee
          this.about=json[0].about
          this.email=json[0].email
          this.contact=json[0].phone
          this.address=json[0].address
          var language=json[0].language
          var jsonss=language.split(",");
          for(var i=0; i<jsonss.length;i++){
            this.row_data.push({
              language:jsonss[i]
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

  hideBanner() {
    this.showPrivacyBanner = false;
    this.store.set('BANN_PRIVACY', 'N');
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
    });
    toast.present();
  }

  async hideModal() {
    const modal = await this.modal.getTop();
    if (modal) {
      modal.dismiss();
    }
  }
  book(){
    if(this.type=='clinic'){
    this.router.navigateByUrl('/booking/'+this.id+'/clinic');
    }
    if(this.type=='diag'){
      this.router.navigateByUrl('/booking/'+this.id+'/diag');
    }
    if(this.type=='hospital'){
      this.router.navigateByUrl('/booking/'+this.id+'/hospital');
    }
  }



}