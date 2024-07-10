'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
	Chart,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
} from 'chart.js';

import styles from '@/app/style.module.css';
const LineChart = () => {
	const chartRef = useRef(null);
	let chartInstance = null;
	const [chartData, setChartData] = useState({
		labels: [
			'1월',
			'2월',
			'3월',
			'4월',
			'5월',
			'6월',
			'7월',
			'8월',
			'9월',
			'10월',
			'11월',
			'12월',
		],
		datasets: [
			{
				label: '평균 기온',
				data: [
					4.5, 5.2, 8.7, 14.4, 18.9, 22.7, 26.4, 27.8, 24.1, 18.1, 12.2, 7,
				],
				fill: false,
				borderColor: 'rgb(17, 90, 173)',
				yAxisID: 'y',
			},
			{
				label: '평균 습도',
				data: [64, 61, 59, 60, 65, 71, 74, 70, 71, 68, 66, 65],
				fill: false,
				borderColor: 'rgb(241, 54, 54)',
				yAxisID: 'y1',
			},
		],
	});
	useEffect(() => {
		const ctx = chartRef.current.getContext('2d');

		const createChart = () => {
			Chart.register(
				LineController,
				CategoryScale,
				LinearScale,
				PointElement,
				LineElement,
				Legend,
			);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			chartInstance = new Chart(ctx, {
				type: 'line',
				options: config.options,
				data: {
					labels: chartData.labels,
					datasets: chartData.datasets,
				},
			});
		};

		const destroyChart = () => {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
		};

		const initializeChart = () => {
			destroyChart(); // 이전 차트 파괴
			createChart(); // 새로운 차트 생성
		};

		// 컴포넌트가 처음 렌더링될 때 차트 초기화
		initializeChart();

		// 컴포넌트가 unmount될 때 차트 파괴
		return () => {
			destroyChart();
		};
	}, [chartData]);
	const config = {
		type: 'line',
		options: {
			interaction: {
				mode: 'index',
			},
			plugins: {
				legend: {
					display: true,
				},
			},
			stacked: false,
			scales: {
				y: {
					type: 'linear',
					display: true,
					position: 'left',
					max: 40,
					min: 0,
					title: {
						display: true,
						text: '평균 기온 ',
					},
				},
				y1: {
					type: 'linear',
					display: true,
					position: 'right',
					max: 100,
					min: 0,
					title: {
						display: true,
						text: '평균 습도 ',
					},
					grid: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				},
			},
		},
	};
	const handleChange = event => {
		const { name, value } = event.target;
		const monthIndex = parseInt(name.replace('month-', '')) - 1; // 월 인덱스 계산
		const datasetIndex = name.includes('temp') ? 0 : 1; // 데이터 세트 인덱스 계산

		const newData = { ...chartData };
		newData.datasets[datasetIndex].data[monthIndex] = parseInt(value);
		setChartData(newData);
	};

	const handleRandomClick = () => {
		const newChartData = { ...chartData };
		for (let i = 0; i < chartData.labels.length; i++) {
			newChartData.datasets[0].data[i] = Math.floor(Math.random() * 30) + 10;
			// 10 ~ 39 사이의 랜덤 기온 값 생성
			newChartData.datasets[1].data[i] = Math.floor(Math.random() * 90) + 10;
			// 10 ~ 99 사이의 랜덤 습도 값 생성
		}
		setChartData(newChartData);
	};

	return (
		<div className={styles.inlineflex}>
			<div className={styles.tableWrapper}>
				<table>
					<thead>
						<tr>
							<th>월</th>
							<th>평균 기온</th>
							<th>평균 습도</th>
						</tr>
					</thead>
					<tbody>
						{chartData.labels.map((month, index) => (
							<tr key={index}>
								<td>{month}</td>
								<td>
									<input
										type="number"
										name={`month-temp-${index + 1}`}
										value={chartData.datasets[0].data[index]}
										onChange={handleChange}
									/>
								</td>
								<td>
									<input
										type="number"
										name={`month-humid-${index + 1}`}
										value={chartData.datasets[1].data[index]}
										onChange={handleChange}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<button onClick={handleRandomClick}>랜덤</button>
			</div>
			<div className={styles.chartwrapper}>
				<canvas ref={chartRef} />
			</div>
		</div>
	);
};

export default LineChart;
