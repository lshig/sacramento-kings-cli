import chalk from 'chalk';

export default class Message {
  hexColor: string;
  style: string | null;
  text: string;

  constructor(hexColor: string, style: string | null, text: string) {
    this.hexColor = hexColor;
    this.style = style ? style : null;
    this.text = text;
  }

  get(): string {
    if (this.style === 'bold') {
      return chalk.bold.hex(this.hexColor)(this.text);
    } else if (this.style === 'underline') {
      return chalk.underline.hex(this.hexColor)(this.text);
    }
    return chalk.hex(this.hexColor)(this.text);
  }

  print(): void {
    console.log(this.get());
  }
}
