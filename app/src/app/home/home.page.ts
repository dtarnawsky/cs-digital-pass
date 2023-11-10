import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { WalletService } from '../wallet.service';
import { Capacitor } from '@capacitor/core';

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
      if (Capacitor.getPlatform() == 'ios') {
        const data = await this.walletService.get('/assets/example2.pkpass');
        await this.walletService.addToWallet(data);
      } else {
        // Get token from the backend
        const token = ''; // TODO need to generate token
        window.open(`https://pay.google.com/gp/v/save/${token}`, '_target');
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      this.busy = false;
    }
  }
}
