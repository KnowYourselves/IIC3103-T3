/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';

const Chat = ({ messages, socket, messageRef }) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    setMessage('');
    socket?.emit(
      'CHAT',
      {
        name,
        message,
        date: new Date(),
      },
    );
  };

  const handleSetUsername = () => {
    setName(input);
  };

  useEffect(() => {
    setInput('');
  }, [name]);

  return (
    <div
      className="flex flex-col self-stretch"
      style={{ height: 500, width: 300 }}
    >
      <div className="mx-auto mb-2 text-2xl font-bold">
        Control Room
      </div>
      <div>
        <input
          className="w-full py-1 pl-2 mb-2 border rounded shadow"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={name || 'Username'}
          type="text"
        />
        <div
          className="text-center text-white bg-gray-500 rounded-md hover:bg-gray-300 hover:text-gray-500 focus:bg-gray-700"
          onClick={handleSetUsername}
        >
          Set Name
        </div>
      </div>
      <div
        className="flex-grow p-2 my-4 space-y-5 overflow-auto border rounded shadow scrollbar-thin scrollbar-thumb-gray-700"
      >
        {
          messages.map((item) => (
            <div
              className="grid grid-cols-3 gap-y-2"
              key={`${item.name}-${item.date}`}
            >
              <p className="col-span-2">{item.name}</p>
              <p className="break-words">{(new Date(item.date)).toTimeString().slice(0, 8)}</p>
              <p className="col-span-3 break-words">{item.message}</p>
              <hr className="col-span-3" />
            </div>
          ))
        }
        <div ref={messageRef} />
      </div>
      <div>
        <input
          className="w-full py-1 pl-2 mb-2 border rounded shadow"
          onChange={(event) => setMessage(event.target.value)}
          placeholder={`Please enter your ${name ? 'message' : 'username'}.`}
          value={message}
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
