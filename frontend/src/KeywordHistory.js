class KeywordHistory {
    // 목록 형태
    $keywordHistory = null;
    data = null;

    constructor({ $target, onSearch }) {
        const $keywordHistory = document.createElement('ul');
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = 'KeywordHistory';
        $target.appendChild(this.$keywordHistory);

        this.onSearch = onSearch;
        this.init();
        this.render();
    }

    init() {
        const data = localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
        console.log(data);
        this.setState(data);
    }

    addKeyword(keyword) {
        let keywordHistory = localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
        keywordHistory.unshift(keyword);
        keywordHistory = keywordHistory.slice(0, 5);
        localStorage.setItem('keywordHistory', keywordHistory.join(','));

        this.init();
    }
    
    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        this.$keywordHistory.innerHTML = this.data
            .map(
                keyword => `
                    <li>
                        <button>${keyword}</button>
                    </li>
                `
            ).join('');
        
        this.$keywordHistory.querySelectorAll('li button')
            .forEach( ($item, index) => {
                $item.addEventListener('click', () => {
                    this.onSearch(this.data[index])
                })
            });
    }
}