import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonState } from 'src/app/store/states/common.state';
import { GetCitiesFromServer } from 'src/app/store/actions/city.actions';

@Component({
  selector: 'cq-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  constructor(private readonly store: Store<CommonState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCitiesFromServer());
  }
}
