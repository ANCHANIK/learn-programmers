class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild(this.$loading);

    this.data = {
      show: true
    }

    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
        <div class="Loading">
          <p>🔥로딩중🔥</p>
        </div>
      `
    } else {
      
    }
  }
}
