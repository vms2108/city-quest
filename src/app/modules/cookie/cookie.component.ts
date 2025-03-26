import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cq-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
