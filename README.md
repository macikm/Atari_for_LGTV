# 🕹️ AtariWebOS - Atari 800 / XE Emulator for LG TV & Web

[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0)
[![Platform: LG webOS](https://img.shields.io/badge/Platform-LG%20webOS%203.0+-red.svg)](https://webostv.developer.lge.com/)
[![WebAssembly & Canvas](https://img.shields.io/badge/Tech-WebAssembly%20%7C%20Canvas%2060FPS-orange.svg)](https://developer.mozilla.org/)
[![Buy Me A Pizza](https://img.shields.io/badge/Donate-Buy%20Me%20A%20Pizza%20🍕-orange.svg)](https://buymeacoffee.com/martinmacko)

> 🌐 **Language / Jazyk:** [English](#-english) | [Čeština](#-čeština)

---

# 🇬🇧 English

**AtariWebOS** is an open-source standalone web application and emulator for the legendary 8-bit **Atari 800 / 800XL / 130XE** home computers, designed specifically for **LG Smart TV (webOS)** as well as modern desktop web browsers.

It runs on a cycle-exact WebAssembly core with true MOS 6502 CPU and ANTIC / GTIA / POKEY chip emulation, offering an authentic retro computing experience and full Atari BASIC compatibility.

---

### 🍕 Support the Project

Enjoying AtariWebOS on your TV or browser? You can support further development, new features, and ongoing maintenance:

👉 **[Buy the developer a pizza on BuyMeACoffee.com](https://buymeacoffee.com/martinmacko)**

---

### ✨ Features

- **True WebAssembly Core:** Powered by the proven C-based Atari800 engine compiled via Emscripten for cycle-exact 6502 execution and ANTIC/GTIA/POKEY emulation.
- **Genuine Atari BASIC (Rev. C):** Full support for tokenized BASIC programs, loops (`FOR/NEXT`), variables, math functions, sound commands (`SOUND`), memory access (`PEEK`, `POKE`), and graphics modes (`GR.0` through `GR.8`, `COLOR`, `PLOT`, `DRAWTO`).
- **60 FPS Canvas Output:** Native 4:3 aspect ratio display with optional retro CRT scanlines shader.
- **Persistent TV Storage (IndexedDB):** Store disk images and cartridges (`.atr`, `.xex`, `.car`, `.rom`, `.cas`) directly inside your TV's internal memory.
- **Mobile Companion Upload UI:** Instantly send game files wirelessly from your smartphone or computer over your local Wi-Fi network using a generated on-screen QR code.
- **Smart Keyboard Mapping & Navigation Protection:**
  - Prevents accidental browser back-navigation when pressing <kbd>Backspace</kbd> (mapped to genuine Atari `DELETE / BACK S`).
  - Dedicated Atari console keys: **F2** (OPTION), **F3** (SELECT), **F4** (START), **F5** (RESET).
  - Compatible with LG Magic Remote mouse cursor pointer and physical USB/Bluetooth keyboards.
- **Multi-language Interface:** Live UI translation with flag dropdown selector: English, Czech, Slovak, German, Spanish, and Italian.

---

### ⌨️ Keyboard & Controller Mapping

AtariWebOS includes an on-the-fly input mode toggle in the top bar:

#### 1. BASIC Mode (Default) – Full Keyboard
In this mode, all alphanumeric keys (including **W**, **S**, **A**, and **D**) are dedicated to typing text and coding in BASIC (so you can freely type `NEW`, `SAVE`, `DRAWTO`, etc.):
- **Alphanumeric typing:** Standard physical keyboard layout.
- **Delete character left:** <kbd>Backspace</kbd> (Atari `DELETE / BACK S`).
- **Joystick 1 movement:** <kbd>Arrow Keys</kbd> or Numpad (<kbd>Num 8</kbd>, <kbd>2</kbd>, <kbd>4</kbd>, <kbd>6</kbd>).
- **FIRE button (Action / Shoot):** <kbd>Right Ctrl</kbd> or <kbd>Num 0</kbd>.

#### 2. Game Mode (WASD)
For action and arcade titles where one-handed left-hand WASD movement is preferred:
- Click the button in the top bar to switch to **`🕹️ Mode: Game WASD`**.
- Movement: <kbd>W</kbd>, <kbd>S</kbd>, <kbd>A</kbd>, <kbd>D</kbd> + <kbd>Right Ctrl</kbd> / <kbd>Num 0</kbd> for Fire.

#### Atari Console Function Keys

| Host Key | Atari 800/XE Function |
| :--- | :--- |
| **F4** | Console: **START** (begins most cartridge/floppy games) |
| **F3** | Console: **SELECT** |
| **F2** | Console: **OPTION** (holding on boot disables BASIC for floppy games) |
| **F5** | Console: **RESET** (Warmstart) |
| **Shift + F5** | **COLD RESET** (Full reboot / fresh BASIC) |
| **F1** | **EMULATOR MENU** (Internal Atari800 configuration, floppy D1:–D8: management) |
| **F6** | **HELP** key (on XL / XE models) |
| **Tab** | **TAB** key |
| **Escape** | **ESC** key |

---

### 📺 Installation on LG Smart TV (webOS)

👉 **[Complete step-by-step installation guide (INSTALL-WEBOS.en.md)](INSTALL-WEBOS.en.md)**

Quick summary:
1. On your LG TV, install the **Developer Mode** app from the LG Content Store, log in, and enable **Dev Mode Status** and **Key Server**.
2. On your PC, launch the free desktop application **[webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases/latest)** and connect to your TV's IP address.
3. Under the **Apps** tab, click **Install** and select the `.ipk` package.

#### How to get the `.ipk` package:
- **From GitHub Actions (Automated Cloud Build):**
  1. Open the repository's **Actions** tab on GitHub.
  2. In the left sidebar, choose **Build LG webOS IPK Package**.
  3. Click **Run workflow** -> confirm with the green button.
  4. Once finished, open the completed run and download the `.ipk` from the **Artifacts** section at the bottom.
- **Local Build (requires Node.js):**
  ```bash
  npm run package:webos
  ```

---

### 🏪 Publishing to webOS Homebrew Channel

If your TV has the community **[Homebrew Channel](https://github.com/webosbrew/webos-homebrew-channel)** installed, AtariWebOS is fully prepared for listing in the catalog so anyone can install it with one click:

1. **GitHub Release:** Create a new release in your repository with tag `v1.0.0` and attach `cz.macikm.atariwebos_1.0.0_all.ipk`.
2. **Prepared files in repository:** The `webosbrew/` folder contains:
   - `webosbrew/cz.macikm.atariwebos.yml` – Catalog entry metadata.
   - `webosbrew/cz.macikm.atariwebos.manifest.json` – Package manifest pointing to the release download.
3. **Submit to Homebrew Catalog:**
   - Fork the official catalog repository **[webosbrew/apps-repo](https://github.com/webosbrew/apps-repo)**.
   - Place `cz.macikm.atariwebos.yml` into the `packages/` directory.
   - Submit a Pull Request. Once merged, AtariWebOS will appear directly in the Homebrew Channel on TVs worldwide!

---

### 🚀 Running Locally on PC

```bash
# Start dev & companion server
npm start
```
Open in your browser:
- **Emulator:** `http://localhost:8080/`
- **Mobile Uploader:** `http://<Your-IP-Address>:8080/upload`

---

### 🙏 Attribution & Credits

This project stands on the shoulders of giants in the retro computing community:
- **Atari800 Core:** The official open-source [Atari800](https://github.com/atari800/atari800) project (GPL-2.0+), maintained by the community since 1995.
- **WebAssembly Build:** Utilizes the optimized Emscripten build and JavaScript glue layer from [GenX-DOS](https://github.com/Retro-Jack/GenX-DOS) by Retro-Jack.
- **Operating System & BASIC:**
  - Original Atari 8-bit ROMs: **Atari XL/XE OS Rev. 2** (16 KB) and **Atari BASIC Rev. C** (8 KB by Shepardson Microsystems).
  - Also compatible with the open-source [AltirraOS and Altirra BASIC](http://www.virtualdub.org/altirra.html) by Avery Lee.
- **webOS Packaging:** Built using official tools and community workflows inspired by [webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop).

---

# 🇨🇿 Čeština

**AtariWebOS** je open-source standalone webová aplikace a emulátor legendárních 8bitových počítačů **Atari 800 / 800XL / 130XE**, navržená speciálně pro chytré televize **LG Smart TV (webOS)** i pro moderní webové prohlížeče.

Běží na plnohodnotném WebAssembly jádře s reálnou emulací procesoru MOS 6502 a čipů ANTIC/GTIA/POKEY, díky čemuž nabízí autentický běh her i originálního Atari BASICu.

---

### 🍕 Podpořte vývoj

Líbí se vám AtariWebOS a chcete podpořit další rozvoj, přidávání nových funkcí a vylepšení pro televize LG?

👉 **[Koupit autorovi pizzu na BuyMeACoffee.com](https://buymeacoffee.com/martinmacko)**

---

### ✨ Klíčové vlastnosti

- **Plnohodnotné WebAssembly jádro:** Skutečný kód emulátoru provádí instrukce 6502, grafiku ANTIC/GTIA a zvuk POKEY.
- **Plná podpora Atari BASICu:** Plně funkční originální Atari BASIC (Revision C). Fungují veškeré cykly `FOR/NEXT`, proměnné, grafické příkazy (`GR.0`, `GRAPHICS 8`, `COLOR`, `PLOT`, `DRAWTO`), tóny `SOUND`, `POKE`, `PEEK` i ukládání.
- **60 FPS Canvas zobrazení:** Autentický poměr stran 4:3 a volitelný retro filtr **CRT Scanlines**.
- **Trvalé úložiště her v paměti TV (IndexedDB):** Ukládání a správa disket a her přímo v paměti televize bez nutnosti opakovaného stahování.
- **Podpora formátů:** `.ATR` (disketové obrazy), `.XEX` (spustitelné binární soubory), `.CAR` / `.ROM` (cartridge moduly), `.CAS` (kazety).
- **Companion Web UI (QR kód):** Okamžité bezdrátové nahrávání her z mobilního telefonu nebo PC po domácí Wi-Fi síti přímo do televize.
- **Chytré mapování klávesnice & ochrana navigace:**
  - Klávesa <kbd>Backspace</kbd> funguje jako pravý Atari `DELETE BACK S` bez nežádoucího zčernání či opuštění stránky.
  - Konzolové klávesy Atari: **F2** (OPTION), **F3** (SELECT), **F4** (START), **F5** (RESET).
  - Podpora kurzoru a dálkového ovladače LG Magic Remote.
- **Vícejazyčné rozhraní:** Výběr jazyků s vlaječkami: čeština, slovenština, angličtina, němčina, španělština a italština.

---

### ⌨️ Ovládání a mapování klávesnice

V aplikaci je k dispozici přepínač profilu klávesnice v horní liště:

#### 1. Režim BASIC (výchozí) – Plná klávesnice
Všechna písmena (včetně **W**, **S**, **A**, **D**) jsou vyhrazena pro psaní textu a příkazů (`NEW`, `SAVE`, `DRAWTO`, `CLS`):
- **Psaní textu a čísel:** Standardní alfanumerické klávesy.
- **Smazání znaku:** <kbd>Backspace</kbd> (odpovídá originální klávese Atari `DELETE / BACK S`).
- **Pohyb joysticku 1:** <kbd>Šipky</kbd> nebo numerický blok (<kbd>Num 8</kbd>, <kbd>2</kbd>, <kbd>4</kbd>, <kbd>6</kbd>).
- **Tlačítko FIRE (střelba / akce):** <kbd>Pravý Ctrl</kbd> nebo <kbd>Num 0</kbd>.

#### 2. Herní režim (WASD Game Mode)
Pro akční arkády s ovládáním levou rukou na klávesách WASD:
- Přepněte v horní liště tlačítko na **`🕹️ Mód: Herní WASD`**.
- Pohyb: <kbd>W</kbd>, <kbd>S</kbd>, <kbd>A</kbd>, <kbd>D</kbd> + <kbd>Pravý Ctrl</kbd> / <kbd>Num 0</kbd> pro FIRE.

#### Systémové klávesy konzole Atari

| Klávesa na PC / TV klávesnici | Funkce v Atari 800/XE |
| :--- | :--- |
| **F4** | Konzole: **START** (spuštění většiny kazet/her) |
| **F3** | Konzole: **SELECT** |
| **F2** | Konzole: **OPTION** (při startu vypíná BASIC pro hry na disketách) |
| **F5** | Konzole: **RESET** (teplý restart / Warmstart) |
| **Shift + F5** | **COLD RESET** (studený restart počítače) |
| **F1** | **EMULATOR MENU** (interní konfigurace Atari800, správa disket D1:–D8:) |
| **F6** | Klávesa **HELP** (u modelů XL / XE) |
| **Tab** | Klávesa **TAB** |
| **Escape** | Klávesa **ESC** |

---

### 📺 Instalace na LG Smart TV (webOS)

👉 **[Kompletní návod k instalaci na LG webOS krok za krokem (INSTALL-WEBOS.md)](INSTALL-WEBOS.md)**

Stručný přehled:
1. V televizi nainstalujte z LG Content Store aplikaci **Developer Mode**, přihlaste se a zapněte **Dev Mode Status** a **Key Server**.
2. Na PC spusťte desktopovou aplikaci **[webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases/latest)** a připojte se k IP adrese TV.
3. V záložce **Apps** klikněte na **Install** a vyberte balíček `.ipk`.

#### Jak získat balíček `.ipk`:
- **Z GitHub Actions (automatické sestavení v cloudu):**
  1. V repozitáři přejděte do záložky **Actions**.
  2. V levém sloupci vyberte **Build LG webOS IPK Package**.
  3. Klikněte na rozbalovací nabídku **Run workflow** a potvrďte zeleným tlačítkem **Run workflow**.
  4. Po dokončení (cca 30 sekund) rozklikněte proběhlou akci a dole v části **Artifacts** stáhněte archiv obsahující hotový `.ipk`.
- **Lokální sestavení (pokud máte Node.js):**
  ```bash
  npm run package:webos
  ```

---

### 🏪 Publikace do webOS Homebrew Channel

Pokud máte televizi LG s nainstalovaným **[Homebrew Channel](https://github.com/webosbrew/webos-homebrew-channel)**:
1. V repozitáři vytvořte nový Release (např. tag `v1.0.0`) a přiložte soubor `cz.macikm.atariwebos_1.0.0_all.ipk`.
2. Ve složce `webosbrew/` jsou připraveny soubory `cz.macikm.atariwebos.yml` a `cz.macikm.atariwebos.manifest.json`.
3. Forkněte repozitář **[webosbrew/apps-repo](https://github.com/webosbrew/apps-repo)**, vložte soubor `cz.macikm.atariwebos.yml` do složky `packages/` a pošlete Pull Request.

---

### 🚀 Lokální spuštění na PC (pro vývoj a hraní v prohlížeči)

```bash
# Spuštění lokálního serveru
npm start
```
Otevřete v prohlížeči:
- **Aplikace:** `http://localhost:8080/`
- **Mobilní nahrávání her:** `http://<Vase-IP-adresa>:8080/upload`

---

### 🙏 Poděkování a původ komponent (Attribution & Credits)

- **Emulační jádro Atari800:** Oficiální open-source projekt [Atari800](https://github.com/atari800/atari800) (GPL-2.0+), vyvíjený komunitou od roku 1995.
- **WebAssembly build:** Využívá optimalizovaný build a JavaScriptové rozhraní z projektu [GenX-DOS](https://github.com/Retro-Jack/GenX-DOS) (autor Retro-Jack).
- **Operační systém a BASIC:** Originální ROM soubory počítačů Atari XL/XE (**Atari XL/XE OS Rev. 2** a **Atari BASIC Rev. C** od Shepardson Microsystems), s podporou [AltirraOS a Altirra BASIC](http://www.virtualdub.org/altirra.html) (Avery Lee).

---

## 📄 Licence

Tento projekt je šířen pod licencí **GNU General Public License v2.0 or later (GPL-2.0-or-later)**.
Vytvořeno s úctou k odkazu počítačů Atari pro komunitu retro hráčů a majitelů LG webOS televizí.
