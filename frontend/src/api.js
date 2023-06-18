const API_ENDPOINT =
  "http://localhost:4001";

// ERROR 목록화
const REQUEST_ERROR = {
  '500': { msg : '요청실패' }
}

const request = async (url) => {

  try {
    // 비동기 대상
    const result = await fetch(url);

    if (result.status === 200) {
      return result.json();

    } else {
      // throw 사용해 요청 실패시 catch 구문으로 전달
      throw REQUEST_ERROR[result.status];
    }

  } catch (error) {
    alert(error.msg);
    return { data: null }
  }

}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
