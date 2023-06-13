class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", e => {
      //document.documentElement.setAttribute('color-mode', e.target.checked? 'dark': 'light');
      this.setColorMode(e.target.checked);
    });

    this.initColorMode()
  }

  initColorMode() {
    // 초기화 (lifeCycle에 의해 초기화 필요)
    // isDarkMode state, checkbox 상태, html attr
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    //document.documentElement.setAttribute('color-mode', this.isDarkMode? 'dark': 'light');
    this.setColorMode(this.isDarkMode);

    // if(this.isDarkMode) {
    //   this.$DarkModeToggle.checked = true;
    // } 
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }
}
