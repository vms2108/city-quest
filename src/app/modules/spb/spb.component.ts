import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestShort } from 'src/app/common/models/quest-short';

import { SpbService } from './common/services/spb.service';

@Component({
  selector: 'cq-spb',
  templateUrl: './spb.component.html',
  styleUrls: ['./spb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpbComponent implements OnInit {

  public list!: Observable<QuestShort[]>;

  constructor(
    private readonly spbService: SpbService,
  ) { }

  public ngOnInit(): void {
    this.loadList();
  }

  private loadList(): void {
    this.list = this.spbService.loadList();
  }
}
