import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://codingtest.brique.kr:8080',
});

async function fetchRandomQuote() {
  return instance.get(`/random`);
}
export { fetchRandomQuote };