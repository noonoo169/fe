import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WsComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
      // Thiết lập kết nối WebSocket
      const socket = new SockJS('http://localhost:8080/ws'); // Thay URL WebSocket tương ứng
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', (response) => {
          const data = JSON.parse(response.body);
          console.log("data: ", data);
        });
        stompClient.send("/app/chat.addUser", {}, JSON.stringify({sender: 'Noo', type: 'JOIN'})
        )
      });
  }, [count]);

  const handleClick = () => {
    // Gửi một yêu cầu khi nút được nhấn
    setCount((preValue) => {
      return preValue + 1;
    });
  };

  // Render component
  return (
    <div>
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

export default WsComponent;
