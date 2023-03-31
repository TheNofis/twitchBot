import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';

import * as dotenv from 'dotenv'
dotenv.config()

import hello from './command/hello.js';
import wl from './command/wl.js';

class Main {
	constructor(channel) {
		this.channel = channel;
	}
	init() {
		const authProvider = new StaticAuthProvider(process.env.clientId, process.env.accessToken);
		this.chatClient = new ChatClient({ authProvider, channels: [this.channel] });
	}
	launch() {
		this.chatClient.connect().then(()=>{
			console.log('Бот запустился успешно!');
			this.chatClient.onMessage((channel, user, text) => {
				const commandList = [
					new hello(this.chatClient, channel, user, text),
					new wl(this.chatClient, channel, user, text),
				]; // объявляем список комманд
				commandList.map((cmd)=>{ 
					cmd.init(); // включаем комманду
				})
			});
		}).catch(()=>{
			console.log('error Token');
		})
	}
}
const newBot = new Main('frankytoon');
newBot.init()
newBot.launch()
