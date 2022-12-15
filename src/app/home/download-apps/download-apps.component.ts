import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-apps',
  templateUrl: './download-apps.component.html',
  styleUrls: ['./download-apps.component.css']
})
export class DownloadAppsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  OpenAppleApp() {
    window.open("https://apps.apple.com/pk/app/nowbuysell/id1613702434", "_blank");
  }

  OpenPlayStore() {
    window.open("https://play.google.com/store/apps/details?id=com.nowbuysell", "_blank");
  }

}
