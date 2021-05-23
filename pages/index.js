import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import Chat from '../components/chat';
import Flights from '../components/flights';

const ENDPOINT = 'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl';
const MAX_MESSAGES = 100;

const DynamicMap = dynamic(() => import('../components/map'), {
  ssr: false,
});

const processFlights = (oldFlights, data) => {
  const currFlight = oldFlights.find((flight) => flight.code === data.code);
  if (currFlight) {
    if (!currFlight.positions) {
      currFlight.positions = [];
    }
    currFlight.positions.push(data.position);
  }
  return [...oldFlights];
};

const processMessages = (oldMessages, data) => [...oldMessages.slice(-MAX_MESSAGES), data];

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { path: '/flights' });
    setChatSocket(socket);
    socket.on('POSITION', (data) => setFlights((oldFlights) => processFlights(oldFlights, data)));
    socket.on('CHAT', (data) => setMessages((oldMessages) => processMessages(oldMessages, data)));
    socket.on('FLIGHTS', (data) => setFlights(data));
    socket.emit('FLIGHTS');
    return () => socket.close();
  }, []);

  return (
    <div>
      <Head>
        <title>Next Airlines</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center w-full my-6">
        <h1 className="text-4xl">Next Airlines</h1>
      </div>
      <div className="flex items-center justify-center mb-4 space-x-32">
        <DynamicMap flights={flights} />
        <Chat messages={messages} socket={chatSocket} />
      </div>
      <div className="flex justify-center w-full">
        <Flights flights={flights} />
      </div>
    </div>
  );
}
