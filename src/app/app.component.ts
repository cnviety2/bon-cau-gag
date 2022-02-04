import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-tao-lao';

  public windowWidthIs1200Less: boolean = false

  public isAuthenticated : boolean = false;

  constructor(
    private cookieService : CookieService,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    window.addEventListener('resize', () => { this.handleResizeEvent(); }, true);
  }

  handleResizeEvent() {
    if (window.innerWidth < 1200) {
      this.windowWidthIs1200Less = true;
    } else {
      this.windowWidthIs1200Less = false;
    }
  }

  ngOnInit() {
    let user = this.authenticationService.getUser();
    if(user){
      this.isAuthenticated = true;
    }
  }

  public logoutHandle(event){
    if(event === 'logout'){
      this.authenticationService.logout();
      this.isAuthenticated = false;
      this.socialAuthService.signOut();
      this.router.navigate(['/home']);
      window.location.reload();
    }
  }

  // myForm: FormGroup;
  // user: SocialUser;
  // isSignedin: boolean = null;
  

  // ngOnInit() {
  //   this.myForm = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });    
    
  //   this.socialAuthService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.isSignedin = (user != null);
  //     console.log(this.user);
  //   });
  // }

  // facebookSignin(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(reponse => {
  //     console.log(reponse);
  //   });
  // }

  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }
}
