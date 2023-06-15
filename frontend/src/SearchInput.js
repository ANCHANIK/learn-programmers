const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRendomSearch }) {
    const $wrapper = document.createElement('section');
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    
    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    // keyup 과 keypress 차이
    $searchInput.addEventListener("keypress", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);

        // 최근 keyword 저장
        this.KeywordHistory.addKeyword(e.target.value);

      }
    });

    //랜덤버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = 'RandomButton';
    this.$randomButton.textContent = '랜덤🐱';

    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener("click", e => {
      onRendomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target,
      onSearch
    });

  }
  render() {}
}
