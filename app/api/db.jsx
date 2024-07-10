import { createPool } from 'mysql2';

const pool = createPool({
	host: 'codingtest.brique.kr',
	user: 'codingtest',
	password: '12brique!@',
	database: 'employees',
	port: 3306,
});

pool.getConnection((err, conn) => {
	if (err) console.log('Error connecting to db...');
	else console.log('Connected to db...!');
	conn.release();
});

const executeQuery = (query, arrParams) => {
	// eslint-disable-next-line no-undef
	return new Promise((resolve, reject) => {
		try {
			pool.query(query, arrParams, (err, data) => {
				if (err) {
					console.log('Error in executing the query');
					reject(err);
				}
				resolve(data);
			});
		} catch (err) {
			reject(err);
		}
	});
};
export default executeQuery;
