import React, { useEffect, useState } from 'react';

export default function RealtimePrice() {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        const wsConnections = [];
        const stockIds = ["003230", "005930", "000660"];

        stockIds.forEach(id => {
            const ws = new WebSocket('ws://localhost:3002');
            ws.onopen = () => {
                console.log(`WebSocket 연결이 열렸습니다. ID: ${id}`);
                ws.send(JSON.stringify({ id }));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(`받은 데이터!! ID: ${id}`, data);
            };

            ws.onclose = () => {
                console.log(`WebSocket 연결이 닫혔습니다. ID: ${id}`);
                setConnections(prevConnections => prevConnections.filter(conn => conn !== ws));
            };

            wsConnections.push(ws);
        });
        setConnections(wsConnections);
        return () => {
            wsConnections.forEach(ws => ws.close());
        };
    }, []);

    return (
      <div>실시간 시세를 받아오는 페이지</div>
    );
}
