import React from 'react';
import LineChart from './chart';
import styles from '@/app/style.module.css';
function Index() {
	return (
		<div className={styles.container}>
			<h1>문제 4 답안</h1>
			<LineChart />
		</div>
	);
}

export default Index;
