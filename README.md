# 🕹️ AtariWebOS - Atari 800 / XE Emulator for LG TV & Web

[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0)
[![Platform: LG webOS](https://img.shields.io/badge/Platform-LG%20webOS%203.0+-red.svg)](https://webostv.developer.lge.com/)
[![WebAssembly & Canvas](https://img.shields.io/badge/Tech-WebAssembly%20%7C%20Canvas%2060FPS-orange.svg)](https://developer.mozilla.org/)

**AtariWebOS** je open-source standalone webová aplikace a emulátor legendárních 8bitových počítačů **Atari 800 / 800XL / 130XE**, navržená speciálně pro chytré televize **LG Smart TV (webOS)** i pro moderní desktopové prohlížeče.

---

## ✨ Klíčové vlastnosti

- **60 FPS Canvas emulace:** Nativní poměr stran 4:3, autentické rozlišení Atari a volitelný retro filtr **CRT Scanlines**.
- **Plná podpora Atari BASICu:** Plně funkční interaktivní příkazová řádka Atari BASICu (Revision C) s autentickým ATASCII 8×8 fontem a 256barvovou GTIA paletou.
- **Web Audio POKEY Engine:** Autentické zvukové efekty (cvakání kláves, krokování disketové mechaniky Atari 1050 / XF551, POKEY tóny).
- **Trvalé úložiště her v paměti TV (IndexedDB):** Ukládání a správa disket a her přímo v televizi bez nutnosti opakovaného stahování.
- **Podpora formátů:** `.ATR` (disketové obrazy včetně čtení ATR hlavičky), `.XEX` (spustitelné binární soubory), `.CAR` / `.ROM` (cartridge moduly), `.CAS` (kazety).
- **Companion Web UI (QR kód):** Okamžité bezdrátové nahrávání her z mobilního telefonu nebo PC po domácí Wi-Fi síti přímo do televize.
- **Ovládání fyzickou klávesnicí & ovladačem:** 
  - Klávesy **F1** (START), **F2** (SELECT), **F3** (OPTION), **F4** (RESET), **Shift+F4** (Cold Restart).
  - Herní joystick: **šipky** / **W, S, A, D** + **mezerník** / **Pravý Ctrl** (FIRE).
  - Alfanumerická klávesnice pro psaní programů v BASICu.
  - Podpora kurzoru a dálkového ovladače LG Magic Remote.

---

## 📁 Struktura projektu

```text
Atari_for_LGTV/
├── package.json              # Konfigurace projektu, skripty a metadata
├── webos/
│   ├── appinfo.json          # Manifest LG webOS aplikace
│   ├── icon.png              # Ikona aplikace (80x80)
│   └── largeIcon.png         # Velká ikona aplikace (130x130)
├── src/
│   ├── index.html            # Hlavní rozhraní aplikace
│   ├── app.js                # Hlavní logika emulátoru, IndexedDB, klávesnice, POKEY
│   └── style.css             # Retro dark-mode 10-foot TV stylopis
├── scripts/
│   ├── server.js             # Dev server & Mobile Companion file uploader
│   ├── build.js              # Sestavení dist složky pro webOS balíček
│   └── create_icons.ps1      # Generátor ikon
└── dist/                     # Vygenerovaná složka připravená pro ares-package
```

---

## 🚀 Rychlý start (Vývoj v prohlížeči / IDE)

Aplikace nevyžaduje žádné složité závislosti a běží na libovolném moderním stroji s Node.js.

### 1. Spuštění lokálního serveru

```bash
npm start
```

V terminálu uvidíte adresy:
- **Lokální aplikace (PC):** `http://localhost:8080/`
- **Mobilní Companion Uploader:** `http://<Vase-IP-adresa>:8080/upload`

Otevřete `http://localhost:8080/` v prohlížeči a ihned můžete začít psát příkazy v Atari BASICu nebo přetáhnout libovolný `.atr` či `.xex` soubor do okna.

---

## 📺 Instalace na LG Smart TV (webOS)

Kompletní podrobný návod krok za krokem naleznete v samostatném dokumentu:
👉 **[Návod k instalaci na LG webOS (INSTALL-WEBOS.md)](INSTALL-WEBOS.md)**

Aplikaci lze nainstalovat velmi jednoduše bez nutnosti instalovat vývojářské nástroje do PC:
1. Zapněte na televizi aplikaci **Developer Mode** a aktivujte **Key Server**.
2. Na PC spusťte bezplatný nástroj **[webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases/latest)**.
3. Připojte televizi a v sekci **Apps** nainstalujte stažený soubor `.ipk`.

### Získání balíčku `.ipk`:
- **Z GitHub Actions:** V záložce **Actions** -> **Build LG webOS IPK Package** -> klikněte na **Run workflow**. Po dokončení stáhněte balíček v sekci *Artifacts*.
- **Lokální sestavení (pokud máte webOS CLI):**
  ```bash
  npm run package:webos
  ```

---

## 🎮 Klávesové zkratky

| Klávesa na PC / TV klávesnici | Funkce v Atari 800/XE |
| :--- | :--- |
| **F1** | Konzole: **START** |
| **F2** | Konzole: **SELECT** |
| **F3** | Konzole: **OPTION** (při startu vypne BASIC) |
| **F4** | Konzole: **RESET** (Warmstart) |
| **Shift + F4** | **COLD RESTART** (studený restart počítače) |
| **Šipky / Num 8, 2, 4, 6** | Pohyb joysticku (Nahoru, Dolů, Vlevo, Vpravo) |
| **Pravý Ctrl / Num 0** | Tlačítko **FIRE** (střelba / akce) |
| **Tlačítko Mód v liště** | Přepnutí mezi módem BASIC (plná klávesnice) a herním WASD |
| **Alfanumerické klávesy** | Standardní psaní textu a příkazů v BASICu (včetně W, S, A, D) |

---

## 📄 Licence

Tento projekt je šířen pod licencí **GNU General Public License v2.0 or later (GPL-2.0-or-later)**.
Vytvořeno s ❤️ pro retro komunitu Atari a LG webOS.

