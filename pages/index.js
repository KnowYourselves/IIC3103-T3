/* eslint-disable no-console */
import Head from 'next/head';
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import styles from '../styles/Home.module.css';

const ENDPOINT = 'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl';

export default function Home() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      path: '/flights',
    });

    socket.on('connect_error', (err) => {
      console.log({
        err,
      });
    });

    socket.on('POSITION', (data) => {
      console.log({
        data,
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Hello World!</p>
      </div>
    </div>
  );
}
