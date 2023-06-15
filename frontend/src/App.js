console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target
    })

    this.DarkModeToggle = new DarkModeToggle({
      $target
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        // 로딩 show
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          // 로딩 hide
          this.Loading.hide();

          // 마지막 검색 내역 로컬에 저장
          this.saveResult(data);

        });
      },
      onRendomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        //console.log(cat);
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult = localStorage.getItem('lastResult') === null ? [] : JSON.parse(localStorage.getItem('lastResult'));
    this.setState(lastResult);
  }
}
