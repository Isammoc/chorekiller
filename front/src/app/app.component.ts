import { Component } from '@angular/core';
import { ConfigService } from './service/config/config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  name: string;
  version: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.observeConfig()
      .subscribe((res) => {
        this.version = res.version;
        this.name = res.name;
      });
  }
}