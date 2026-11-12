# Instalace AtariWebOS na LG webOS

> 🇬🇧 **[English version available here](INSTALL-WEBOS.en.md)**

Aplikace **AtariWebOS** přináší plnohodnotný emulátor počítačů Atari 800/XE s podporou Atari BASICu, ukládáním her a ovládáním fyzickou klávesnicí i dálkovým ovladačem přímo na obrazovku vaší televize LG.

## Co potřebujete

- Televizi LG s webOS a počítač ve stejné domácí síti (Wi-Fi nebo LAN).
- Bezplatný vývojářský účet [LG Developer](https://webostv.developer.lge.com/).
- Aplikaci [webOS Dev Manager pro Windows, macOS nebo Linux](https://github.com/webosbrew/dev-manager-desktop/releases/latest).
- Instalační balíček `.ipk`:
  - Můžete jej stáhnout z části **Releases** na GitHubu (nebo z GitHub Actions v záložce **Actions** -> **Build LG webOS IPK Package** -> sekce **Artifacts**).
  - Případně sestavit lokálně příkazem `npm run package:webos`.

---

## 1. Připravte televizi

1. V televizi otevřete **LG Content Store** (nebo **Apps**) a vyhledejte aplikaci **Developer Mode**.
2. Aplikaci nainstalujte, spusťte a přihlaste se svým účtem LG Developer.
3. V aplikaci zapněte volbu **Dev Mode Status** (televize vás může vyzvat k restartu).
4. Po restartu znovu otevřete aplikaci Developer Mode a zapněte volbu **Key Server**.
5. Poznamenejte si zobrazenou **IP adresu** televize a přístupový kód **Passphrase** (rozlišují se velká a malá písmena).

---

## 2. Připojte počítač

1. Na svém počítači spusťte program **webOS Dev Manager**.
2. Klikněte na tlačítko pro přidání nového zařízení (**Add Device**) a vyberte režim **Developer Mode**.
3. Zadejte poznamenanou **IP adresu** televize a kód **Passphrase**.
4. Pokud program vyžaduje doplňující parametry připojení:
   - Port: `9922`
   - Uživatelské jméno: `prisoner`
5. Otestujte a potvrďte připojení k televizi.

---

## 3. Nainstalujte aplikaci

1. V programu webOS Dev Manager přejděte do sekce **Apps**.
2. Klikněte na tlačítko **Install** (nebo **Install App**).
3. Vyberte stažený instalační soubor `cz.macikm.atariwebos_1.0.0_all.ipk`.
4. Počkejte na dokončení instalace.
5. Na televizi stiskněte tlačítko Home (Domeček) na dálkovém ovladači a v nabídce nainstalovaných aplikací spusťte **AtariWebOS**.

---

## 4. Ovládání na televizi

- **Klávesnice:** Připojte do USB portu televize libovolnou USB nebo bezdrátovou klávesnici.
  - **F4:** Klávesa START
  - **F3:** Klávesa SELECT
  - **F2:** Klávesa OPTION
  - **F5:** Klávesa RESET (Warmstart) / **Shift + F5:** Cold Reset
  - **Šipky:** Směry joysticku
  - **Pravý Ctrl / Num 0:** Tlačítko FIRE
  - **Písmena a číslice:** Psaní programů a příkazů v Atari BASICu
- **LG Magic Remote:** Podporováno je ukotvení kurzoru, klikání na virtuální systémová tlačítka a výběr her z knihovny.
- **Nahrávání her z mobilu/PC:** Klikněte v horní liště na **Nahrát z mobilu**, naskenujte zobrazený QR kód telefonem a odešlete své `.atr` či `.xex` soubory bezdrátově do paměti TV.

---

## Platnost Developer Mode

Vývojářský režim na LG TV má z bezpečnostních důvodů výrobce časově omezenou platnost (obvykle 50–1000 hodin).
- Zbývající čas můžete kdykoliv zkontrolovat přímo v aplikaci **Developer Mode** v poli **Remain Session**.
- Před vypršením času stačí v aplikaci stisknout tlačítko **EXTEND**, čímž se platnost prodlouží na maximum.
- Pokud by platnost vypršela a televize se restartovala, LG systém aplikace nainstalované přes Developer Mode dočasně skryje/odinstaluje. V takovém případě stačí Developer Mode znovu zapnout a aplikaci znovu nainstalovat.

---

## Když se nedaří

- **webOS Dev Manager se nemůže připojit k TV:**
  - Ujistěte se, že televize i počítač jsou připojeny ke stejné domácí síti (pozor na izolované Wi-Fi sítě pro hosty).
  - Zkontrolujte, zda je v televizi v aplikaci Developer Mode aktivní **Key Server** (při vypnutí TV se může Key Server deaktivovat, stačí jej v aplikaci znovu zapnout).
  - Ověřte, že IP adresa televize nebyla routerem změněna.

---

[Oficiální dokumentace LG Developer Mode](https://webostv.developer.lge.com/develop/getting-started/developer-mode-app)

