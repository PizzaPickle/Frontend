export default function RealtimePrice() {
    let ws;
    ws = new WebSocket('ws://3.34.126.55:8080');
    ws.onopen = function() {
        console.log('WebSocket 연결이 열렸습니다.');
        ws.send(JSON.stringify({ id: "005930" }));
    };
    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("받은 데이터!!", data);
    };

    ws.onclose = function(event) {
        console.log('WebSocket 연결이 닫혔습니다.');
    };

    return (
      <div>실시간 시세를 받아오는 페이지</div>
    )
  }