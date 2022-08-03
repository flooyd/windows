import { writable } from "svelte/store";
import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

const client = ioClient(ENDPOINT);

const socket = writable(client);

socket.subscribe((value) => value);

export default socket;
