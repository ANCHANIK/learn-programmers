console.log("app is running!");

import Loading from './Loading.js';
import DarkModeToggle from './DarkModeToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import api from './api.js';

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  data = {
    items: [],
    page: this.DEFAULT_PAGE
  }

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
          //this.setState(data ? data : []); // refactor
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE
          })
          // 로딩 hide
          this.Loading.hide();

          // 마지막 검색 내역 로컬에 저장
          this.saveResult(data);

        });
      },
      onRendomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          //this.setState(data);
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE
          })
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: cat => {
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      onNextPage: () => {
        this.Loading.show();
        const keywordHistroy = localStorage.getItem('keywordHistory') !== null && localStorage.getItem('keywordHistory').split('');
        const lastKeyword = keywordHistroy[0];
        const page = this.page + 1;

        api.fetchCatsPage(lastKeyword ,page).then(({ data }) => {

          let newData = this.data.concat(data);

          //this.setState(newData);
          // this.page = page;
          this.setState({
            items: newData,
            page: page
          });
          this.Loading.hide();

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
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult = localStorage.getItem('lastResult') === null ? [] : JSON.parse(localStorage.getItem('lastResult'));
    //this.setState(lastResult);
    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE
    });
  }
}

export default App;