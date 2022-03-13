// window.navigator.userAgent = 'react-native';
import {io } from 'socket.io-client'


const socket = io('https://ovatalk.herokuapp.com');




export default socket