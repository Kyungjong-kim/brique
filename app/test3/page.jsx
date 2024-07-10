import executeQuery from '@/app/api/db'; // Import MySQL connection
import styles from '@/app/style.module.css';

async function Index() {
	// mysql 연결하고, ERD 분석 후 쿼리 작성
	const query = `
    SELECT
      e.emp_no,
      e.first_name,
      e.last_name,
      e.gender,
      e.hire_date,
      d.dept_name,
      t.title,
      MAX(s.salary) AS max_salary
    FROM employees AS e
    JOIN dept_emp AS de ON e.emp_no = de.emp_no
    JOIN departments AS d ON de.dept_no = d.dept_no
    JOIN titles AS t ON e.emp_no = t.emp_no
    JOIN salaries AS s ON e.emp_no = s.emp_no
    WHERE e.hire_date >= '2000-01-01'
    GROUP BY e.emp_no
    ORDER BY max_salary DESC
  `;
	const data = await executeQuery(query);
	const getdata = JSON.parse(JSON.stringify(data));
	return (
		<div className={styles.container}>
			<h1>문제 3 답안</h1>
			<table>
				<thead>
					<tr>
						<th>emp_no</th>
						<th>first_name</th>
						<th>last_name</th>
						<th>gender</th>
						<th>hire_date</th>
						<th>dept_name</th>
						<th>title</th>
						<th>max_salary</th>
					</tr>
				</thead>
				<tbody>
					{getdata?.map(employee => (
						<tr key={employee.emp_no}>
							<td>{employee.emp_no}</td>
							<td>{employee.first_name}</td>
							<td>{employee.last_name}</td>
							<td>{employee.gender}</td>
							<td>{new Date(employee.hire_date).toLocaleDateString()}</td>
							{/* 날짜 포맷팅 */}
							<td>{employee.dept_name}</td>
							<td>{employee.title}</td>
							<td>{employee.max_salary}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p>{getdata.length} rows in set</p>
		</div>
	);
}
export default Index;
