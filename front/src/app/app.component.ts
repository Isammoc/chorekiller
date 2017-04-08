import { Component, OnInit } from '@angular/core';
import { ConfigService } from './service/config/config.service';
@Component({
  selector: 'ck-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.observeConfig()
      .subscribe((res) => {
        this.name = res.name;
      });
  }
}
