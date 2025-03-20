import { Component } from '@angular/core';

@Component({
  selector: 'cq-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  public activeTab: string = 'quests';

  public setTab(tab: string): void {
    this.activeTab = tab;
  }
}
