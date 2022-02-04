import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../service/template/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public user: User = null;
  @ViewChild('container') container: ElementRef;
  @ViewChild('postImg') postImg: ElementRef;

  constructor(private authenticationService: AuthenticationService,

    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initContainerHeight();
    },1000);
  }

  ngAfterViewChecked(): void {
  }

  public nameOnMouseEnter(event: MouseEvent): void {
    let element = event.srcElement as HTMLElement;
    element.classList.add('name-hover');
  }

  public nameOnMouseLeave(event: MouseEvent): void {
    let element = event.srcElement as HTMLElement;
    element.classList.remove('name-hover');
  }

  private calculateContainerHeightBaseOnImgHeight(imgHeight: number): string {
    imgHeight = imgHeight + 130;
    return imgHeight + 'px';
  }

  private initContainerHeight() {
    let imgHeight = this.postImg.nativeElement.clientHeight as number;
    let height = this.calculateContainerHeightBaseOnImgHeight(imgHeight);
    this.renderer.setStyle(this.container, 'height', height);
  }

}
