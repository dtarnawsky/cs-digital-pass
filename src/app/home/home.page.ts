import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  busy = false;

  constructor(private walletService: WalletService) { }

  async download() {
    try {
      this.busy = true;
      const data = await this.walletService.get('/assets/example2.pkpass');
      await this.walletService.addToWallet(data);
    } catch (error: any) {
      alert(error.message)
    } finally {
      this.busy = false;
    }
  }
}
