import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  pbVisible: boolean;

  constructor(public events: Events) {
    events.subscribe('showProgressBar', () => {
      this.pbVisible = true;
    });
    events.subscribe('hideProgressBar', () => {
      this.pbVisible = false;
    });
  }

  ngOnInit() {}
}
