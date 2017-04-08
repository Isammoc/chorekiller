import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config/config.service';

@Component({
  selector: 'ck-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  version = '0.0.0';

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.observeConfig()
      .subscribe((res) => {
        this.version = res.version;
      });
  }
}
