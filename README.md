# 🕹️ AtariWebOS - Atari 800 / XE Emulator for LG TV & Web

[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0)
[![Platform: LG webOS](https://img.shields.io/badge/Platform-LG%20webOS%203.0+-red.svg)](https://webostv.developer.lge.com/)
[![WebAssembly & Canvas](https://img.shields.io/badge/Tech-WebAssembly%20%7C%20Canvas%2060FPS-orange.svg)](https://developer.mozilla.org/)
[![Buy Me A Pizza](https://img.shields.io/badge/Donate-Koupit%20pizzu%20🍕-orange.svg)](https://buymeacoffee.com/martinmacko)

**AtariWebOS** je open-source standalone webová aplikace a emulátor legendárních 8bitových počítačů **Atari 800 / 800XL / 130XE**, navržená speciálně pro chytré televize **LG Smart TV (webOS)** i pro moderní webové prohlížeče.

Běží na plnohodnotném WebAssembly jádře s reálnou emulací procesoru MOS 6502 a čipů ANTIC/GTIA/POKEY, díky čemuž nabízí autentický běh her i originálního Atari BASICu.

---

## 🍕 Podpořte vývoj

Líbí se vám AtariWebOS a chcete podpořit další rozvoj, přidávání nových funkcí a vylepšení pro televize LG?

👉 **[Koupit autorovi pizzu na BuyMeACoffee.com](https://buymeacoffee.com/martinmacko)**

---

## ✨ Klíčové vlastnosti

- **Plnohodnotné WebAssembly jádro:** Žádná zjednodušená náhražka – skutečný kód emulátoru provádí instrukce 6502, grafiku ANTIC/GTIA a zvuk POKEY.
- **Plná podpora Atari BASICu:** Plně funkční originální Atari BASIC (Revision C). Fungují veškeré cykly `FOR/NEXT`, proměnné, grafické příkazy (`GR.0`, `GRAPHICS 8`, `COLOR`, `PLOT`, `DRAWTO`), tóny `SOUND`, `POKE`, `PEEK` i ukládání.
- **60 FPS Canvas zobrazení:** Autentický poměr stran 4:3 a volitelný retro filtr **CRT Scanlines**.
- **Trvalé úložiště her v paměti TV (IndexedDB):** Ukládání a správa disket a her přímo v paměti televize bez nutnosti opakovaného stahování.
- **Podpora formátů:** `.ATR` (disketové obrazy), `.XEX` (spustitelné binární soubory), `.CAR` / `.ROM` (cartridge moduly), `.CAS` (kazety).
- **Companion Web UI (QR kód):** Okamžité bezdrátové nahrávání her z mobilního telefonu nebo PC po domácí Wi-Fi síti přímo do televize.
- **Chytré mapování klávesnice & ochrana navigace:**
  - Klávesa <kbd>Backspace</kbd> funguje jako pravý Atari `DELETE BACK S` bez nežádoucího zčernání či opuštění stránky.
  - Konzolové klávesy Atari: **F2** (OPTION), **F3** (SELECT), **F4** (START), **F5** (RESET).
  - Podpora kurzoru a dálkového ovladače LG Magic Remote.

---

## ⌨️ Ovládání a mapování klávesnice

V aplikaci je k dispozici přepínač profilu klávesnice v horní liště:

### 1. Režim BASIC (výchozí) – Plná klávesnice
Aby bylo možné v Atari BASICu pohodlně psát veškeré příkazy a programy, jsou všechna písmena (včetně **W**, **S**, **A**, **D**) vyhrazena pro psaní textu (např. příkazy `NEW`, `SAVE`, `DRAWTO`, `CLS`):
- **Psaní textu a čísel:** Standardní alfanumerické klávesy.
- **Smazání znaku:** <kbd>Backspace</kbd> (odpovídá originální klávese Atari `DELETE / BACK S`).
- **Pohyb joysticku 1:** <kbd>Šipky</kbd> nebo numerický blok (<kbd>Num 8</kbd>, <kbd>2</kbd>, <kbd>4</kbd>, <kbd>6</kbd>).
- **Tlačítko FIRE (střelba / akce):** <kbd>Pravý Ctrl</kbd> nebo <kbd>Num 0</kbd>.

### 2. Herní režim (WASD Game Mode)
Pokud hrajete čistě akční arkádu a chcete ovládat pohyb levou rukou na klávesách WASD:
- Přepněte v horní liště tlačítko na **`🕹️ Mód: Herní WASD`**.
- Pohyb: <kbd>W</kbd>, <kbd>S</kbd>, <kbd>A</kbd>, <kbd>D</kbd> + <kbd>Pravý Ctrl</kbd> / <kbd>Num 0</kbd> pro FIRE.

### Systémové klávesy konzole Atari

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

## 📺 Instalace na LG Smart TV (webOS)

👉 **[Kompletní návod k instalaci na LG webOS krok za krokem (INSTALL-WEBOS.md)](INSTALL-WEBOS.md)**

Stručný přehled:
1. V televizi nainstalujte z LG Content Store aplikaci **Developer Mode**, přihlaste se a zapněte **Dev Mode Status** a **Key Server**.
2. Na PC spusťte desktopovou aplikaci **[webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases/latest)** a připojte se k IP adrese TV.
3. V záložce **Apps** klikněte na **Install** a vyberte balíček `.ipk`.

### Jak získat balíček `.ipk`:
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

## 🏪 Publikace do webOS Homebrew Channel

Pokud máte televizi LG s nainstalovaným **[Homebrew Channel](https://github.com/webosbrew/webos-homebrew-channel)** (komunitní obchod aplikací pro webOS), můžete aplikaci do tohoto katalogu zařadit, aby si ji mohl kdokoliv nainstalovat jedním kliknutím přímo z obrazovky TV:

1. **Vytvořte GitHub Release:** V repozitáři vytvořte nový Release (např. tag `v1.0.0`) a přiložte soubor `cz.macikm.atariwebos_1.0.0_all.ipk`.
2. **Připravené soubory v repozitáři:** V adresáři `webosbrew/` máte předchystaný balíček:
   - `webosbrew/cz.macikm.atariwebos.yml` – definiční záznam aplikace.
   - `webosbrew/cz.macikm.atariwebos.manifest.json` – manifest s odkazem na stažení `.ipk`.
3. **Odeslání do oficiálního repozitáře Homebrew:**
   - Otevřete repozitář katalogu **[webosbrew/apps-repo](https://github.com/webosbrew/apps-repo)**.
   - Vytvořte fork a do složky `packages/` vložte soubor `cz.macikm.atariwebos.yml`.
   - Vytvořte Pull Request do `webosbrew/apps-repo`.
   - Po schválení správci se AtariWebOS automaticky zobrazí v katalogu Homebrew Channelu na všech LG televizích po celém světě!

---

## 🚀 Lokální spuštění na PC (pro vývoj a hraní v prohlížeči)

```bash
# Spuštění lokálního serveru
npm start
```
Otevřete v prohlížeči:
- **Aplikace:** `http://localhost:8080/`
- **Mobilní nahrávání her:** `http://<Vase-IP-adresa>:8080/upload`

---

## 🙏 Poděkování a původ komponent (Attribution & Credits)

Tento projekt staví na skvělé práci retro a open-source komunity:
- **Emulační jádro Atari800:** Oficiální open-source projekt [Atari800](https://github.com/atari800/atari800) (GPL-2.0+), přenosný emulátor počítačů Atari 8-bit a konzole 5200 vyvíjený od roku 1995.
- **WebAssembly & Emscripten build:** Využívá optimalizovaný build a JavaScriptové rozhraní z projektu [GenX-DOS](https://github.com/Retro-Jack/GenX-DOS) (autor Retro-Jack).
- **Operační systém a BASIC:** 
  - Originální ROM soubory počítačů Atari XL/XE: **Atari XL/XE OS Rev. 2** (16 KB) a **Atari BASIC Rev. C** (8 KB).
  - Projekt plně podporuje též svobodný [AltirraOS a Altirra BASIC](http://www.virtualdub.org/altirra.html) (autor Avery Lee).

---

## 📄 Licence

Tento projekt je šířen pod licencí **GNU General Public License v2.0 or later (GPL-2.0-or-later)**.
Vytvořeno s úctou k odkazu počítačů Atari pro komunitu retro hráčů a majitelů LG webOS televizí.
