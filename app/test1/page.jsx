'use client';
import React, { useState } from 'react';
import styles from '@/app/style.module.css';
function Index() {
	const [result, setResult] = useState('');
	const [totalLines, setTotalLines] = useState(0);
	const [calculatedLines, setCalculatedLines] = useState(0);
	const [errorValues, setErrorValues] = useState([]);
	// csv 업로드 버튼
	const handleFileUpload = async event => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const text = e.target.result;
				processCSV(text);
			};
			reader.readAsText(file);
		}
	};
	// csv 파일 처리로직
	const processCSV = data => {
		const rows = data.split('\n').map(row => row.split(','));
		let validRows = [];
		let inValidRows = [];
		let nonNumberValues = [];
		// 행을 확인하여 값이 숫자인지 확인한다.
		rows.forEach(row => {
			// row의 값이 숫자인지 판독
			let isValid = row.every(val => !isNaN(val) && val.trim() !== '');
			if (isValid) {
				validRows.push(row.map(Number));
			} else {
				inValidRows.push(row);
				// 숫자가 아닌 값을 수집.
				nonNumberValues.push(
					row.filter(val => isNaN(val) || val.trim() !== ''),
				);
			}
		});
		// 결과값 계산하기
		let calculateValue = validRows.map(row => {
			return {
				min: Math.min(...row),
				max: Math.max(...row),
				sum: row.reduce((a, b) => a + b, 0),
				avg: row.reduce((a, b) => a + b, 0) / row.length,
				std: calculateSTD(row),
				midValue: calculateMidValue(row),
			};
		});
		displayResult(calculateValue, nonNumberValues, rows.length);
	};
	const calculateSTD = num => {
		// 평균값
		const avg = num.reduce((a, b) => a + b, 0) / num.length;
		// 분산
		const variance =
			num.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / num.length;
		return Math.sqrt(variance);
	};
	// 중간값 계산
	const calculateMidValue = num => {
		// 정렬 후 계산
		const sorted = num.slice().sort((a, b) => a - b);
		const middle = Math.floor(sorted.length / 2);

		if (sorted.length % 2 === 0) {
			return (sorted[middle - 1] + sorted[middle]) / 2;
		} else {
			return sorted[middle];
		}
	};
	const displayResult = (calculateValue, nonNumberValues, totalLines) => {
		let resultText = '';
		calculateValue.forEach(stat => {
			resultText += `${stat.min} ${stat.max} ${stat.sum} ${stat.avg} ${stat.std} ${stat.midValue}\n`;
		});
		setTotalLines(totalLines);
		setCalculatedLines(calculateValue.length);
		setErrorValues(nonNumberValues);
		setResult(resultText);
	};
	return (
		<div className={styles.container}>
			<h1>문제 1 답안</h1>
			<input
				type="file"
				accept=".csv"
				id="fileInput"
				onChange={handleFileUpload}
			/>
			<div className={styles.wrapper}>
				<pre>{result}</pre>
			</div>
			=====================
			<pre>The total number of lines: {totalLines}</pre>
			<pre>The calculated lines: {calculatedLines}</pre>
			<pre> The error values:</pre>
			<pre>
				{errorValues.map((row, index) => (
					<div key={index}>{row.join(', ')}</div>
				))}
			</pre>
		</div>
	);
}

export default Index;
