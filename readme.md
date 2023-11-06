# Digital Passes



## Adding to Apple Wallet

Digital passes for Apple Wallet are a file format called `pkpass`. 

You can create these, send them as email attachments, or download them as files. They are generated by your backend server.


## Downloading a pkpass file
You can download a pkpass file using the standard JS fetch api:
```typescript
  public async get(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    if (!base64 || base64 instanceof ArrayBuffer) {
      throw new Error(`Unable to get ${url}`);
    }
    return base64;
  }
```

As we need the pkpass data base64 encoded we have a helper function called `blobToBase64`:
```typescript
function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
```

## Adding to Apple Wallet

You can add your pkpass data to the mobile device using a plugin called `capacitor-pass-to-wallet` which you can install with:

```bash
npm install capacitor-pass-to-wallet
npx cap sync
```

Call the `addToWallet` function passing in the base64 pkpass data you downloaded:

```typescript
import { CapacitorPassToWallet } from 'capacitor-pass-to-wallet';
...
await CapacitorPassToWallet.addToWallet({ base64: data });
```

You should see a standard Apple "add pass" dialog with details of your pass. The user can click "Add" to add to Apple Wallet.