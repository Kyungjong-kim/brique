'use client'
import React,{useState} from 'react'
import styles from '@/app/style.module.css';

export default function Index() {
  const [last, setLast] = useState(7);
  const [target, setTarget] = useState(3);
  const [result, setResult] = useState([]);
  const handleCalculate = () => {
    // 사람의 배열을 만든다.
    const people = Array.from({ length: last }, (_, i) => i + 1);
    const result = [];
    let currentIndex = 0;
    // 사람의 수가 0이 되기전까지 반복하면서 순서대로 제거하고 결과에 기록한다.
    while (people.length > 0) {
      currentIndex = (currentIndex + target - 1) % people.length;
      result.push(people.splice(currentIndex, 1)[0]);
    }
    setResult(result);
  }
  const handleChangeLast = (e) => setLast(Number(e.target.value));
  const handleChangeTarget = (e) => setTarget(Number(e.target.value));

  return (
    <div className={styles.container}>
      <h1>문제 8 답안</h1>
      <p>
        N과 M이 주어지면 (N,M) -조세퍼스 순열을 구하는 프로그램을 작성하시오.
      </p>
      <label htmlFor="">N</label>
      <input type="text" value={last} onChange={handleChangeLast} />
      <label htmlFor="">M</label>
      <input type="text" value={target} onChange={handleChangeTarget} />
      <button onClick={handleCalculate}>조세퍼스 순열 실행</button>
      <p>{JSON.stringify(result)}</p>
    </div>
  );
}