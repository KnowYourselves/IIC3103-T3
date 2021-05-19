/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';

const Chat = ({ messages, socket, messageRef }) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    socket?.emit(
      'CHAT',
      {
        name,
        message,
        date: new Date(),
      },
    );
  };

  return (
    <div
      className="flex flex-col self-stretch"
      style={{ height: 500, width: 300 }}
    >
      <div>
        <input
          className="w-full py-1 pl-2 mb-2 border rounded shadow"
          onChange={(event) => setInput(event.target.value)}
          type="text"
        />
        <div
          className="text-center text-white bg-gray-500 rounded-md hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-700"
          onClick={() => setName(input)}
        >
          Set Name
        </div>
      </div>
      <div className="flex-grow p-2 my-4 overflow-auto border rounded shadow">
        {
          messages.map((item) => (
            <div key={`${item.name}-${item.date}`}>
              <p>{item.name}</p>
              <p className="break-words">{(new Date(item.date)).toTimeString().slice(0, 8)}</p>
              <p className="break-words">{item.message}</p>
            </div>
          ))
        }
        <div ref={messageRef} />
      </div>
      <div>
        <input
          className="w-full py-1 pl-2 mb-2 border rounded shadow"
          onChange={(event) => setMessage(event.target.value)}
          type="text"
        />
        <div
          className="text-center text-white bg-gray-500 rounded-md hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-700"
          onClick={handleMessageSend}
        >
          Send
        </div>
      </div>
    </div>
  );
};

export default Chat;
