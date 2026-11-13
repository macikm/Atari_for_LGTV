/**
 * AtariWebOS - Internationalization (i18n) Engine
 * Supported languages: cs (Čeština), sk (Slovenčina), en (English), de (Deutsch), es (Español), it (Italiano)
 */

const TRANSLATIONS = {
  cs: {
    buy_pizza: "Koupit pizzu",
    buy_pizza_title: "Podpořit vývojáře - Koupit pizzu",
    mode_basic: "Mód: BASIC",
    mode_wasd: "Mód: Herní WASD",
    mode_title: "Přepnout režim vstupu: Plná klávesnice pro BASIC vs. Herní WASD",
    upload_mobile: "Nahrát z mobilu",
    upload_mobile_title: "Nahrávání her z mobilu/PC přes QR kód",
    toggle_audio_title: "Zapnout / Vypnout zvuk",
    crt_filter: "CRT",
    crt_filter_title: "Přepnout retro CRT scanlines filtr",
    fullscreen: "Fullscreen",
    fullscreen_title: "Přepnout na celou obrazovku",
    library_controls: "Knihovna & Ovládání",
    library_controls_title: "Otevřít / zavřít postranní panel",
    
    // Quick console keys
    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "COLD RESTART",
    btn_option_title: "Konzolová klávesa OPTION (F2)",
    btn_select_title: "Konzolová klávesa SELECT (F3)",
    btn_start_title: "Konzolová klávesa START (F4)",
    btn_reset_title: "Konzolová klávesa RESET / Warmstart (F5)",
    btn_cold_reset_title: "Studený restart / Nový BASIC",

    // Tabs
    tab_library: "Knihovna her",
    tab_controls: "Ovládání",
    tab_settings: "Nastavení",

    // Library
    library_title: "Uložené hry & disky",
    files_count_one: "soubor",
    files_count_few: "soubory",
    files_count_many: "souborů",
    dropzone_title: "Nahrát hry a disky",
    dropzone_desc: "Klikněte nebo přetáhněte soubory .ATR, .XEX, .CAR, .ROM sem",
    search_placeholder: "Hledat v knihovně...",
    empty_library: "Zatím nemáte uloženy žádné hry v paměti TV.<br>Nahrajte diskety nebo spusťte Atari BASIC.",
    action_run: "▶ Spustit",
    action_delete: "Smazat",
    delete_confirm: "Opravdu chcete smazat {name}?",

    // Controls guide
    controls_joy_title: "Herní ovládání (Joystick 1)",
    controls_movement: "Pohyb (nahoru, dolů, vlevo, vpravo)",
    controls_arrows: "Šipky nebo Num 8, 2, 4, 6",
    controls_fire: "Tlačítko FIRE (střelba / akce)",
    controls_fire_key: "Pravý Ctrl nebo Num 0",
    controls_wasd_desc: "Tlačítkem <strong>Mód: BASIC / WASD</strong> v horní liště lze povolit i klávesy <span class=\"key-badge\">W, S, A, D</span>",
    controls_system_title: "Systémové klávesy Atari",
    key_start: "START klávesa",
    key_select: "SELECT klávesa",
    key_option: "OPTION klávesa (při bootu vypíná BASIC)",
    key_reset: "RESET (Warmstart)",
    key_cold_reset: "COLD RESET (studený restart)",
    key_menu: "EMULATOR MENU / Nastavení",
    key_help: "HELP klávesa (XL/XE)",
    basic_guide_title: "Práce s Atari BASICem",
    basic_guide_desc: "Fyzická klávesnice funguje přímo jako originální klávesnice počítačů Atari 800XL/130XE. Klávesa Backspace maže znak vlevo. Můžete psát přímo příkazy BASICu:",

    // Settings
    settings_title: "Nastavení emulátoru",
    setting_machine: "Model počítače:",
    setting_tv_system: "Televizní norma:",
    setting_sample_rate: "Zvuková vzorkovací frekvence:",
    support_title: "Baví vás AtariWebOS?",
    support_desc: "Podpořte další vývoj emulátoru a novinky koupí virtuální pizzy!",
    buy_pizza_btn: "🍕 Koupit autorovi pizzu",
    clear_all_data: "Smazat všechna data z paměti TV",
    clear_all_confirm: "Opravdu chcete vymazat VŠECHNY hry z paměti televize?",

    // Modal
    modal_upload_title: "Nahrát hry z mobilu či PC",
    modal_close: "✕ Zavřít",
    modal_upload_desc: "Naskenujte QR kód fotoaparátem mobilního telefonu nebo zadejte adresu níže do prohlížeče v počítači na stejné Wi-Fi síti pro okamžité odeslání disket a her do televizoru.",
    modal_upload_local: "Vybrat soubory z tohoto zařízení",

    // Notices
    notice_saved: "Uloženo do paměti TV: ",
    notice_running: "Spuštěno: ",
    notice_cleared: "Paměť TV byla vymazána",
    notice_wasd: "Aktivován herní režim (WASD = Joystick)",
    notice_basic: "Aktivován režim BASIC (plná klávesnice)",
    paste_progress: "📋 Vkládám do BASICu ({percent}%) – ESC pro zrušení",
    paste_done: "✅ Vložení textu dokončeno",
    paste_cancelled: "⏹ Vkládání zrušeno",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Vložit text ze schránky do BASICu (Ctrl+V / Shift+Insert)",
    paste_prompt: "Vložte BASIC kód pro zapsání do Atari:"
  },

  sk: {
    buy_pizza: "Kúpiť pizzu",
    buy_pizza_title: "Podporiť vývojára - Kúpiť pizzu",
    mode_basic: "Mód: BASIC",
    mode_wasd: "Mód: Herný WASD",
    mode_title: "Prepnúť režim vstupu: Plná klávesnica pre BASIC vs. Herný WASD",
    upload_mobile: "Nahrať z mobilu",
    upload_mobile_title: "Nahrávanie hier z mobilu/PC cez QR kód",
    toggle_audio_title: "Zapnúť / Vypnúť zvuk",
    crt_filter: "CRT",
    crt_filter_title: "Prepnúť retro CRT scanlines filter",
    fullscreen: "Celá obrazovka",
    fullscreen_title: "Prepnúť na celú obrazovku",
    library_controls: "Knižnica & Ovládanie",
    library_controls_title: "Otvoriť / zatvoriť bočný panel",

    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "STUDENÝ REŠTART",
    btn_option_title: "Konzolový kláves OPTION (F2)",
    btn_select_title: "Konzolový kláves SELECT (F3)",
    btn_start_title: "Konzolový kláves START (F4)",
    btn_reset_title: "Konzolový kláves RESET / Warmstart (F5)",
    btn_cold_reset_title: "Studený reštart / Nový BASIC",

    tab_library: "Knižnica hier",
    tab_controls: "Ovládanie",
    tab_settings: "Nastavenia",

    library_title: "Uložené hry & disky",
    files_count_one: "súbor",
    files_count_few: "súbory",
    files_count_many: "súborov",
    dropzone_title: "Nahrať hry a disky",
    dropzone_desc: "Kliknite alebo pretiahnite súbory .ATR, .XEX, .CAR, .ROM sem",
    search_placeholder: "Hľadať v knižnici...",
    empty_library: "Zatiaľ nemáte uložené žiadne hry v pamäti TV.<br>Nahrajte diskety alebo spustite Atari BASIC.",
    action_run: "▶ Spustiť",
    action_delete: "Zmazať",
    delete_confirm: "Naozaj chcete zmazať {name}?",

    controls_joy_title: "Herné ovládanie (Joystick 1)",
    controls_movement: "Pohyb (hore, dole, vľavo, vpravo)",
    controls_arrows: "Šípky alebo Num 8, 2, 4, 6",
    controls_fire: "Tlačidlo FIRE (streľba / akcia)",
    controls_fire_key: "Pravý Ctrl alebo Num 0",
    controls_wasd_desc: "Tlačidlom <strong>Mód: BASIC / WASD</strong> v hornej lište je možné povoliť aj klávesy <span class=\"key-badge\">W, S, A, D</span>",
    controls_system_title: "Systémové klávesy Atari",
    key_start: "START kláves",
    key_select: "SELECT kláves",
    key_option: "OPTION kláves (pri štarte vypína BASIC)",
    key_reset: "RESET (Warmstart)",
    key_cold_reset: "COLD RESET (studený reštart)",
    key_menu: "EMULATOR MENU / Nastavenia",
    key_help: "HELP kláves (XL/XE)",
    basic_guide_title: "Práca s Atari BASICom",
    basic_guide_desc: "Fyzická klávesnica funguje priamo ako originálna klávesnica počítačov Atari 800XL/130XE. Kláves Backspace maže znak vľavo. Môžete písať priamo príkazy BASICu:",

    settings_title: "Nastavenia emulátora",
    setting_machine: "Model počítača:",
    setting_tv_system: "Televízna norma:",
    setting_sample_rate: "Vzorkovacia frekvencia zvuku:",
    support_title: "Baví vás AtariWebOS?",
    support_desc: "Podporte ďalší vývoj emulátora kúpou virtuálnej pizze!",
    buy_pizza_btn: "🍕 Kúpiť autorovi pizzu",
    clear_all_data: "Zmazať všetky dáta z pamäte TV",
    clear_all_confirm: "Naozaj chcete vymazať VŠETKY hry z pamäte televízora?",

    modal_upload_title: "Nahrať hry z mobilu či PC",
    modal_close: "✕ Zavrieť",
    modal_upload_desc: "Naskenujte QR kód fotoaparátom mobilného telefónu alebo zadajte adresu nižšie do prehliadača v počítači na rovnakej Wi-Fi sieti pre okamžité odoslanie hier do TV.",
    modal_upload_local: "Vybrať súbory z tohto zariadenia",

    notice_saved: "Uložené do pamäte TV: ",
    notice_running: "Spustené: ",
    notice_cleared: "Pamäť TV bola vymazaná",
    notice_wasd: "Aktivovaný herný režim (WASD = Joystick)",
    notice_basic: "Aktivovaný režim BASIC (plná klávesnica)",
    paste_progress: "📋 Vkladám do BASICu ({percent}%) – ESC pre zrušenie",
    paste_done: "✅ Vloženie textu dokončené",
    paste_cancelled: "⏹ Vkladanie zrušené",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Vložiť text zo schránky do BASICu (Ctrl+V / Shift+Insert)",
    paste_prompt: "Vložte BASIC kód na zapísanie do Atari:"
  },

  en: {
    buy_pizza: "Buy Pizza",
    buy_pizza_title: "Support the developer - Buy a pizza",
    mode_basic: "Mode: BASIC",
    mode_wasd: "Mode: Game WASD",
    mode_title: "Toggle Input Mode: Full Keyboard for BASIC vs. Game WASD",
    upload_mobile: "Upload via Mobile",
    upload_mobile_title: "Upload games from phone or PC via QR code",
    toggle_audio_title: "Turn Audio On / Off",
    crt_filter: "CRT",
    crt_filter_title: "Toggle Retro CRT Scanlines Filter",
    fullscreen: "Fullscreen",
    fullscreen_title: "Toggle Fullscreen Mode",
    library_controls: "Library & Controls",
    library_controls_title: "Open / close sidebar",

    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "COLD RESTART",
    btn_option_title: "Console OPTION key (F2)",
    btn_select_title: "Console SELECT key (F3)",
    btn_start_title: "Console START key (F4)",
    btn_reset_title: "Console RESET / Warmstart (F5)",
    btn_cold_reset_title: "Cold Reset / Fresh BASIC",

    tab_library: "Game Library",
    tab_controls: "Controls",
    tab_settings: "Settings",

    library_title: "Saved Games & Disks",
    files_count_one: "file",
    files_count_few: "files",
    files_count_many: "files",
    dropzone_title: "Upload Games & Disks",
    dropzone_desc: "Click or drag & drop .ATR, .XEX, .CAR, .ROM files here",
    search_placeholder: "Search library...",
    empty_library: "No games stored in TV memory yet.<br>Drop disk images or start Atari BASIC.",
    action_run: "▶ Run",
    action_delete: "Delete",
    delete_confirm: "Are you sure you want to delete {name}?",

    controls_joy_title: "Game Controls (Joystick 1)",
    controls_movement: "Movement (Up, Down, Left, Right)",
    controls_arrows: "Arrow Keys or Num 8, 2, 4, 6",
    controls_fire: "FIRE Button (Action / Shoot)",
    controls_fire_key: "Right Ctrl or Num 0",
    controls_wasd_desc: "Use the <strong>Mode: BASIC / WASD</strong> button in the top bar to enable <span class=\"key-badge\">W, S, A, D</span> keys",
    controls_system_title: "Atari System Console Keys",
    key_start: "START key",
    key_select: "SELECT key",
    key_option: "OPTION key (holding on boot disables BASIC)",
    key_reset: "RESET key (Warmstart)",
    key_cold_reset: "COLD RESET (Full reboot)",
    key_menu: "EMULATOR MENU / Config",
    key_help: "HELP key (XL/XE)",
    basic_guide_title: "Working with Atari BASIC",
    basic_guide_desc: "Your physical keyboard maps directly to the original Atari 800XL/130XE layout. Backspace deletes character left. Type standard BASIC commands:",

    settings_title: "Emulator Settings",
    setting_machine: "Computer Model:",
    setting_tv_system: "TV Video Standard:",
    setting_sample_rate: "Audio Sample Rate:",
    support_title: "Enjoying AtariWebOS?",
    support_desc: "Support further development and improvements by buying me a virtual pizza!",
    buy_pizza_btn: "🍕 Buy Developer a Pizza",
    clear_all_data: "Clear All Data from TV Memory",
    clear_all_confirm: "Are you sure you want to delete ALL games from TV memory?",

    modal_upload_title: "Upload Games from Phone or PC",
    modal_close: "✕ Close",
    modal_upload_desc: "Scan the QR code with your phone camera or enter the address below in a desktop browser on the same Wi-Fi network to instantly send disk images to your TV.",
    modal_upload_local: "Select Files from this Device",

    notice_saved: "Saved to TV memory: ",
    notice_running: "Running: ",
    notice_cleared: "TV memory cleared",
    notice_wasd: "Game Mode active (WASD = Joystick)",
    notice_basic: "BASIC Mode active (Full Keyboard)",
    paste_progress: "📋 Pasting to BASIC ({percent}%) – ESC to cancel",
    paste_done: "✅ Paste completed",
    paste_cancelled: "⏹ Paste cancelled",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Paste text from clipboard into BASIC (Ctrl+V / Shift+Insert)",
    paste_prompt: "Paste BASIC code to type into Atari:"
  },

  de: {
    buy_pizza: "Pizza spendieren",
    buy_pizza_title: "Entwickler unterstützen - Pizza spendieren",
    mode_basic: "Modus: BASIC",
    mode_wasd: "Modus: Gaming WASD",
    mode_title: "Eingabemodus umschalten: Volle Tastatur für BASIC vs. Gaming WASD",
    upload_mobile: "Vom Handy hochladen",
    upload_mobile_title: "Spiele per QR-Code vom Smartphone oder PC senden",
    toggle_audio_title: "Ton ein- / ausschalten",
    crt_filter: "CRT",
    crt_filter_title: "Retro-CRT-Scanlines-Filter umschalten",
    fullscreen: "Vollbild",
    fullscreen_title: "Vollbildmodus umschalten",
    library_controls: "Bibliothek & Steuerung",
    library_controls_title: "Seitenleiste öffnen / schließen",

    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "KALTSTART",
    btn_option_title: "Konsolentaste OPTION (F2)",
    btn_select_title: "Konsolentaste SELECT (F3)",
    btn_start_title: "Konsolentaste START (F4)",
    btn_reset_title: "Konsolentaste RESET / Warmstart (F5)",
    btn_cold_reset_title: "Kaltstart / Frisches BASIC",

    tab_library: "Spielebibliothek",
    tab_controls: "Steuerung",
    tab_settings: "Einstellungen",

    library_title: "Gespeicherte Spiele & Disketten",
    files_count_one: "Datei",
    files_count_few: "Dateien",
    files_count_many: "Dateien",
    dropzone_title: "Spiele & Disketten hochladen",
    dropzone_desc: "Klicken oder .ATR, .XEX, .CAR, .ROM Dateien hierher ziehen",
    search_placeholder: "Bibliothek durchsuchen...",
    empty_library: "Noch keine Spiele im TV-Speicher gespeichert.<br>Disketten laden oder Atari BASIC starten.",
    action_run: "▶ Starten",
    action_delete: "Löschen",
    delete_confirm: "Möchten Sie {name} wirklich löschen?",

    controls_joy_title: "Spielsteuerung (Joystick 1)",
    controls_movement: "Bewegung (Hoch, Runter, Links, Rechts)",
    controls_arrows: "Pfeiltasten oder Ziffernblock 8, 2, 4, 6",
    controls_fire: "FEUER-Taste (Aktion / Schuss)",
    controls_fire_key: "Rechte Strg-Taste oder Num 0",
    controls_wasd_desc: "Mit der Taste <strong>Modus: BASIC / WASD</strong> in der oberen Leiste können auch <span class=\"key-badge\">W, S, A, D</span> aktiviert werden",
    controls_system_title: "Atari System-Konsolentasten",
    key_start: "START-Taste",
    key_select: "SELECT-Taste",
    key_option: "OPTION-Taste (deaktiviert BASIC beim Booten)",
    key_reset: "RESET-Taste (Warmstart)",
    key_cold_reset: "COLD RESET (Kaltstart)",
    key_menu: "EMULATOR-MENÜ / Konfiguration",
    key_help: "HELP-Taste (XL/XE)",
    basic_guide_title: "Arbeiten mit Atari BASIC",
    basic_guide_desc: "Ihre Tastatur funktioniert wie die Originaltastatur von Atari 800XL/130XE. Backspace löscht Zeichen links. Sie können BASIC-Befehle direkt eingeben:",

    settings_title: "Emulator-Einstellungen",
    setting_machine: "Computermodell:",
    setting_tv_system: "Fernsehnorm:",
    setting_sample_rate: "Audio-Abtastrate:",
    support_title: "Gefällt Ihnen AtariWebOS?",
    support_desc: "Unterstützen Sie die Weiterentwicklung mit einer virtuellen Pizza!",
    buy_pizza_btn: "🍕 Dem Entwickler eine Pizza kaufen",
    clear_all_data: "Alle Daten aus dem TV-Speicher löschen",
    clear_all_confirm: "Möchten Sie wirklich ALLE Spiele aus dem Speicher des Fernsehers löschen?",

    modal_upload_title: "Spiele vom Smartphone oder PC senden",
    modal_close: "✕ Schließen",
    modal_upload_desc: "Scannen Sie den QR-Code mit Ihrem Smartphone oder rufen Sie die Adresse im selben WLAN auf.",
    modal_upload_local: "Dateien von diesem Gerät auswählen",

    notice_saved: "Im TV-Speicher gespeichert: ",
    notice_running: "Gestartet: ",
    notice_cleared: "TV-Speicher geleert",
    notice_wasd: "Gaming-Modus aktiv (WASD = Joystick)",
    notice_basic: "BASIC-Modus aktiv (Volle Tastatur)",
    paste_progress: "📋 Einfügen in BASIC ({percent}%) – ESC zum Abbrechen",
    paste_done: "✅ Einfügen abgeschlossen",
    paste_cancelled: "⏹ Einfügen abgebrochen",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Text aus Zwischenablage in BASIC einfügen (Strg+V)",
    paste_prompt: "BASIC-Code für Atari einfügen:"
  },

  es: {
    buy_pizza: "Comprar pizza",
    buy_pizza_title: "Apoyar al desarrollador - Comprar una pizza",
    mode_basic: "Modo: BASIC",
    mode_wasd: "Modo: Juego WASD",
    mode_title: "Cambiar modo: Teclado completo para BASIC vs. Juego WASD",
    upload_mobile: "Cargar desde móvil",
    upload_mobile_title: "Cargar juegos desde el móvil o PC mediante código QR",
    toggle_audio_title: "Activar / Desactivar sonido",
    crt_filter: "CRT",
    crt_filter_title: "Activar filtro retro de líneas CRT",
    fullscreen: "Pantalla completa",
    fullscreen_title: "Pantalla completa",
    library_controls: "Biblioteca y Controles",
    library_controls_title: "Abrir / cerrar panel lateral",

    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "REINICIO EN FRÍO",
    btn_option_title: "Tecla de consola OPTION (F2)",
    btn_select_title: "Tecla de consola SELECT (F3)",
    btn_start_title: "Tecla de consola START (F4)",
    btn_reset_title: "Tecla de consola RESET / Warmstart (F5)",
    btn_cold_reset_title: "Reinicio en frío / Nuevo BASIC",

    tab_library: "Biblioteca",
    tab_controls: "Controles",
    tab_settings: "Ajustes",

    library_title: "Juegos y discos guardados",
    files_count_one: "archivo",
    files_count_few: "archivos",
    files_count_many: "archivos",
    dropzone_title: "Cargar juegos y discos",
    dropzone_desc: "Haz clic o arrastra archivos .ATR, .XEX, .CAR, .ROM aquí",
    search_placeholder: "Buscar en la biblioteca...",
    empty_library: "Aún no hay juegos en la memoria de la TV.<br>Carga disquetes o inicia Atari BASIC.",
    action_run: "▶ Iniciar",
    action_delete: "Eliminar",
    delete_confirm: "¿Seguro que deseas eliminar {name}?",

    controls_joy_title: "Controles de juego (Joystick 1)",
    controls_movement: "Movimiento (Arriba, Abajo, Izquierda, Derecha)",
    controls_arrows: "Flechas o teclado numérico 8, 2, 4, 6",
    controls_fire: "Botón DISPARO (Acción / Fuego)",
    controls_fire_key: "Ctrl derecho o Num 0",
    controls_wasd_desc: "Con el botón <strong>Modo: BASIC / WASD</strong> en la barra superior puedes activar <span class=\"key-badge\">W, S, A, D</span>",
    controls_system_title: "Teclas de sistema Atari",
    key_start: "Tecla START",
    key_select: "Tecla SELECT",
    key_option: "Tecla OPTION (desactiva BASIC al iniciar)",
    key_reset: "Tecla RESET (reinicio rápido)",
    key_cold_reset: "COLD RESET (reinicio completo)",
    key_menu: "MENÚ EMULADOR / Ajustes",
    key_help: "Tecla HELP (XL/XE)",
    basic_guide_title: "Uso de Atari BASIC",
    basic_guide_desc: "El teclado físico responde como el original de Atari 800XL/130XE. Backspace borra el carácter a la izquierda. Puedes escribir comandos BASIC directamente:",

    settings_title: "Ajustes del emulador",
    setting_machine: "Modelo de ordenador:",
    setting_tv_system: "Norma de TV:",
    setting_sample_rate: "Frecuencia de muestreo de audio:",
    support_title: "¿Disfrutas de AtariWebOS?",
    support_desc: "¡Apoya el desarrollo invitándome a una pizza virtual!",
    buy_pizza_btn: "🍕 Comprar una pizza al autor",
    clear_all_data: "Borrar todos los datos de la memoria de la TV",
    clear_all_confirm: "¿Seguro que deseas borrar TODOS los juegos de la TV?",

    modal_upload_title: "Cargar juegos desde el móvil o PC",
    modal_close: "✕ Cerrar",
    modal_upload_desc: "Escanea el código QR con tu móvil o abre la dirección en un navegador en la misma red Wi-Fi.",
    modal_upload_local: "Seleccionar archivos de este dispositivo",

    notice_saved: "Guardado en la memoria de la TV: ",
    notice_running: "Ejecutando: ",
    notice_cleared: "Memoria de la TV borrada",
    notice_wasd: "Modo juego activado (WASD = Joystick)",
    notice_basic: "Modo BASIC activado (Teclado completo)",
    paste_progress: "📋 Pegando en BASIC ({percent}%) – ESC para cancelar",
    paste_done: "✅ Pegado completado",
    paste_cancelled: "⏹ Pegado cancelado",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Pegar texto del portapapeles en BASIC (Ctrl+V)",
    paste_prompt: "Pega el código BASIC para Atari:"
  },

  it: {
    buy_pizza: "Offri una pizza",
    buy_pizza_title: "Sostieni lo sviluppatore - Offri una pizza",
    mode_basic: "Modo: BASIC",
    mode_wasd: "Modo: Gioco WASD",
    mode_title: "Cambia modalità: Tastiera completa per BASIC vs. Gioco WASD",
    upload_mobile: "Carica da smartphone",
    upload_mobile_title: "Invia giochi da smartphone o PC tramite codice QR",
    toggle_audio_title: "Attiva / Disattiva audio",
    crt_filter: "CRT",
    crt_filter_title: "Filtro scansione retrò CRT",
    fullscreen: "Schermo intero",
    fullscreen_title: "Modalità schermo intero",
    library_controls: "Libreria & Controlli",
    library_controls_title: "Apri / chiudi barra laterale",

    btn_option: "OPTION (F2)",
    btn_select: "SELECT (F3)",
    btn_start: "START (F4)",
    btn_reset: "RESET (F5)",
    btn_cold_reset: "RIAVVIO A FREDDO",
    btn_option_title: "Tasto console OPTION (F2)",
    btn_select_title: "Tasto console SELECT (F3)",
    btn_start_title: "Tasto console START (F4)",
    btn_reset_title: "Tasto console RESET / Warmstart (F5)",
    btn_cold_reset_title: "Riavvio a freddo / Nuovo BASIC",

    tab_library: "Libreria giochi",
    tab_controls: "Controlli",
    tab_settings: "Impostazioni",

    library_title: "Giochi & dischi salvati",
    files_count_one: "file",
    files_count_few: "file",
    files_count_many: "file",
    dropzone_title: "Carica giochi e dischi",
    dropzone_desc: "Clicca o trascina qui i file .ATR, .XEX, .CAR, .ROM",
    search_placeholder: "Cerca nella libreria...",
    empty_library: "Nessun gioco salvato nella memoria della TV.<br>Carica dischetti o avvia Atari BASIC.",
    action_run: "▶ Avvia",
    action_delete: "Elimina",
    delete_confirm: "Sei sicuro di voler eliminare {name}?",

    controls_joy_title: "Controlli di gioco (Joystick 1)",
    controls_movement: "Movimento (Su, Giù, Sinistra, Destra)",
    controls_arrows: "Frecce o tastierino numerico 8, 2, 4, 6",
    controls_fire: "Pulsante FIRE (Azione / Sparo)",
    controls_fire_key: "Ctrl destro o Num 0",
    controls_wasd_desc: "Con il pulsante <strong>Modo: BASIC / WASD</strong> nella barra superiore puoi abilitare <span class=\"key-badge\">W, S, A, D</span>",
    controls_system_title: "Tasti di sistema Atari",
    key_start: "Tasto START",
    key_select: "Tasto SELECT",
    key_option: "Tasto OPTION (disabilita BASIC all'avvio)",
    key_reset: "Tasto RESET (Warmstart)",
    key_cold_reset: "COLD RESET (Riavvio completo)",
    key_menu: "MENU EMULATORE / Configurazione",
    key_help: "Tasto HELP (XL/XE)",
    basic_guide_title: "Lavorare con Atari BASIC",
    basic_guide_desc: "La tastiera fisica risponde come l'originale di Atari 800XL/130XE. Backspace cancella a sinistra. Puoi scrivere comandi BASIC direttamente:",

    settings_title: "Impostazioni emulatore",
    setting_machine: "Modello computer:",
    setting_tv_system: "Standard video TV:",
    setting_sample_rate: "Frequenza di campionamento audio:",
    support_title: "Ti piace AtariWebOS?",
    support_desc: "Sostieni lo sviluppo offrendomi una pizza virtuale!",
    buy_pizza_btn: "🍕 Offri una pizza allo sviluppatore",
    clear_all_data: "Cancella tutti i dati dalla memoria della TV",
    clear_all_confirm: "Sei sicuro di voler eliminare TUTTI i giochi dalla memoria della TV?",

    modal_upload_title: "Carica giochi da smartphone o PC",
    modal_close: "✕ Chiudi",
    modal_upload_desc: "Scansiona il codice QR con lo smartphone o inserisci l'indirizzo in un browser sulla stessa rete Wi-Fi.",
    modal_upload_local: "Seleziona file da questo dispositivo",

    notice_saved: "Salvato nella memoria della TV: ",
    notice_running: "Avviato: ",
    notice_cleared: "Memoria TV cancellata",
    notice_wasd: "Modalità gioco attiva (WASD = Joystick)",
    notice_basic: "Modalità BASIC attiva (Tastiera completa)",
    paste_progress: "📋 Incolla in BASIC ({percent}%) – ESC per annullare",
    paste_done: "✅ Incolla completato",
    paste_cancelled: "⏹ Operazione annullata",
    btn_paste: "📋 PASTE (CTRL+V)",
    btn_paste_title: "Incolla testo dagli appunti in BASIC (Ctrl+V)",
    paste_prompt: "Incolla il codice BASIC per Atari:"
  }
};

const FLAG_MAP = {
  cs: 'cz',
  sk: 'sk',
  en: 'gb',
  de: 'de',
  es: 'es',
  it: 'it'
};

const LANG_NAMES = {
  cs: 'Čeština',
  sk: 'Slovenčina',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano'
};

let currentLang = localStorage.getItem('atariWebOS_lang') || 'cs';

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (TRANSLATIONS[lang]) {
    currentLang = lang;
    localStorage.setItem('atariWebOS_lang', lang);
    applyTranslations();
  }
}

export function t(key, params = {}) {
  let text = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
             (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) ||
             key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp(`{${k}}`, 'g'), v);
  }
  return text;
}

export function applyTranslations() {
  // Translate text contents
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
      el.placeholder = t(key);
    } else {
      el.innerHTML = t(key);
    }
  });

  // Translate tooltips and titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  // Update Language Dropdown widget
  const flagCode = FLAG_MAP[currentLang] || 'cz';
  document.querySelectorAll('.lang-selected').forEach(el => {
    const img = el.querySelector('img');
    const span = el.querySelector('span');
    if (img) {
      img.src = `https://flagcdn.com/w40/${flagCode}.png`;
      img.alt = currentLang.toUpperCase();
    }
    if (span) {
      span.innerText = currentLang.toUpperCase();
    }
  });

  // Update dynamic elements in app if loaded
  if (window.atariApp && typeof window.atariApp.onLanguageChange === 'function') {
    window.atariApp.onLanguageChange();
  }

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

// Make accessible on window object for inline onclick handlers
window.setLanguage = setLanguage;
window.t = t;
window.applyTranslations = applyTranslations;

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
});

