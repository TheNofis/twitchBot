export default class {
  constructor(chatClient, channel, user, text) {
    this.chatClient = chatClient;
    this.channel = channel;
    this.user = user;
    this.text = text;
  }
  init(){
    if(this.text!='!wl')return;
    this.chatClient.say(this.channel, `@${this.user} Вот стата:`)
  }
}