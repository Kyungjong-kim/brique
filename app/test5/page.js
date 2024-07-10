import React from 'react';
import { fetchRandomQuote } from '@/app/api/random';
import styles from '@/app/style.module.css'
// 인용문호출
async function fetchRandomQuotes() {
 try {
   const response = await fetchRandomQuote();
   return response.data;
 } catch (error) {
   console.error('Error fetching random quote:', error);
   return null;
 }
}

export default async function Index() {
  const resultArr = [];
  for (let i = 0; i < 100; i++) {
    try {
      const results = await fetchRandomQuotes();
      if (results) {
        resultArr.push(results);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }
  // 100개의 인용문을 재 가공. 중복되면 카운트를 올린다
  const counts = resultArr.reduce((acc, result) => {
    const { id } = result;
    if (acc[id]) {
      acc[id].count++;
    } else {
      acc[id] = { count: 1, data: result };
    }
    return acc;
  }, {});
  // 정렬 및 카운트
  const sortedResults = Object.values(counts).sort((a, b) => b.count - a.count);
  const totalCount = sortedResults.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className={styles.container}>
      <h1>문제 5 답안</h1>
      {sortedResults.map((item, index) => (
        <div key={index}>
          <p>
            count: {item.count} {JSON.stringify(item.data)}
          </p>
        </div>
      ))}
      <p>Total count: {totalCount}</p>
    </div>
  );
}
