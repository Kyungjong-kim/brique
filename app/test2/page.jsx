'use client';

import { useEffect, useState } from 'react';
import { socket } from '../socket';
import styles from '@/app/style.module.css';

function Index() {
	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');
	const [msg, setMessage] = useState('Ping');
	const [requests, setRequests] = useState([]);
	const [responses, setResponses] = useState([]);
	let requestCounter = requests.length + 1;
	// 소켓연결
	useEffect(() => {
		if (socket.connected) {
			onConnect();
		}
		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);
			socket.io.engine.on('upgrade', transport => {
				setTransport(transport.name);
			});
		}

		function onDisconnect() {
			setIsConnected(false);
			setTransport('N/A');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		socket.on('response', data => {
			setResponses(prev => [...prev, `Received(${prev.length + 1}): ${data}`]);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('response');
		};
	}, []);
	// 메세지를 보낼때 카운트
	const handleMessage = () => {
		const currentRequest = `Send(${requestCounter}): ${msg}`;
		setRequests(prev => [...prev, currentRequest]);
		socket.emit('request', { msg, id: requestCounter });
		requestCounter++;
	};

	const handleChange = e => {
		setMessage(e.target.value);
	};

	return (
    <div className={styles.container}>
      <h1>문제 2 답안</h1>
      {/* npm run server 로 백엔드 서버구동 필요 */}
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>
      <input type="text" value={msg} onChange={handleChange} />
      <button onClick={handleMessage}>send</button>
      <div>
        <h3>Requests:</h3>
        <ul>
          {requests.map((request, index) => (
            <li key={index}>{request}</li>
          ))}
        </ul>
        <h3>Responses:</h3>
        <ul>
          {responses.map((response, index) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Index;
