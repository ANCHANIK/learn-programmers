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
        console.log('show');
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          
          // 로딩 hide
          console.log('hide');

        });
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
