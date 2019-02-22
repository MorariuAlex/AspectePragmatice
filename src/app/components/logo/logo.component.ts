import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})

export class LogoComponent {
  @Input() logoWidth = 150;
  @Input() logoHeight = 150;
  @Input() white = true;
}
