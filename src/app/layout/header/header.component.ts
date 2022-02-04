import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/service/template/user';
import { EventEmitter } from  '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated: boolean = false;
  @Output() logout : EventEmitter<string> = new EventEmitter();

  public user: User = null;

  constructor(
    private socialAuthService: SocialAuthService,
    private snackBarService: MatSnackBar,
    private authenticationService: AuthenticationService,
    private router : Router) { }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.user = this.authenticationService.getUser();
      console.log('user',this.user);
    }
  }

  onMouseEnter(event: MouseEvent) {
    let element = event.srcElement as HTMLElement;
    element.classList.remove('text-white');
    element.classList.add('text-muted');
  }

  onMouseLeave(event: MouseEvent) {
    let element = event.srcElement as HTMLElement;
    element.classList.remove('text-muted');
    element.classList.add('text-white');
  }

  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => {
      this.authenticationService.storeUser(response as User);
      this.user = this.authenticationService.getUser();
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      window.location.reload();
    }).catch(error => {
      let snackbarConfig = new MatSnackBarConfig();
      snackbarConfig.duration = 5000;
      snackbarConfig.panelClass = 'custom-error-snackbar';
      this.snackBarService.open('Lỗi rồi', null, snackbarConfig);
    });
  }

  logOut(): void {
    //this.socialAuthService.signOut();
    this.logout.emit('logout');
  }

}
