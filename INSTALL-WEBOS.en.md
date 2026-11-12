# Installing AtariWebOS on LG webOS TV

**AtariWebOS** brings a full standalone Atari 800 / 800XL / 130XE computer emulator with authentic Atari BASIC, local disk storage, and physical keyboard support directly to your LG Smart TV screen.

## Prerequisites

- LG Smart TV with webOS and a computer on the same local network (Wi-Fi or Ethernet).
- Free [LG Developer Account](https://webostv.developer.lge.com/).
- [webOS Dev Manager for Windows, macOS or Linux](https://github.com/webosbrew/dev-manager-desktop/releases/latest).
- Installation `.ipk` package:
  - Download from the **Releases** tab on GitHub (or from GitHub Actions under **Actions** -> **Build LG webOS IPK Package** -> **Artifacts**).
  - Or build locally using `npm run package:webos`.

---

## 1. Prepare your TV

1. On your TV, open the **LG Content Store** (or **Apps**) and search for **Developer Mode**.
2. Install and launch the Developer Mode app, then log in with your LG Developer account.
3. Turn on **Dev Mode Status** (the TV may prompt you to reboot).
4. After rebooting, open the Developer Mode app again and turn on **Key Server**.
5. Note the displayed **IP address** and **Passphrase** (case-sensitive).

---

## 2. Connect from your PC

1. Launch **webOS Dev Manager** on your computer.
2. Click **Add Device** and select **Developer Mode**.
3. Enter the TV's **IP address** and **Passphrase**.
4. If prompted for advanced connection parameters:
   - Port: `9922`
   - Username: `prisoner`
5. Test and save the connection.

---

## 3. Install the application

1. In webOS Dev Manager, navigate to the **Apps** tab.
2. Click **Install** (or **Install App**).
3. Select the downloaded `cz.macikm.atariwebos_1.0.0_all.ipk` file.
4. Wait for the installation to finish.
5. On your TV, press the **Home** button on the remote control and launch **AtariWebOS** from the app launcher ribbon.

---

## 4. Controls on the TV

- **Keyboard:** Connect any USB or wireless keyboard to the TV's USB port.
  - **F4:** Console START key
  - **F3:** Console SELECT key
  - **F2:** Console OPTION key
  - **F5:** Console RESET (Warmstart) / **Shift + F5:** Cold Reset
  - **Arrow keys:** Joystick directions
  - **Right Ctrl / Num 0:** Joystick FIRE button
  - **Alphanumeric keys:** Typing programs and commands in Atari BASIC
- **LG Magic Remote:** Mouse cursor pointer, clicking on virtual console keys, and browsing the game library.
- **Wireless Game Uploads:** Click **Upload via Mobile** in the top bar, scan the QR code with your smartphone, and send your `.atr` or `.xex` floppy images wirelessly into TV storage.

---

## Developer Mode Session Expiration

LG limits the Developer Mode session duration (typically 50–1000 hours).
- Check the remaining time inside the **Developer Mode** app on TV under **Remain Session**.
- Press **EXTEND** before it expires to reset the timer to maximum.
- If it expires, simply toggle Developer Mode back on and reinstall the app.

---

[Official LG Developer Mode Documentation](https://webostv.developer.lge.com/develop/getting-started/developer-mode-app)

