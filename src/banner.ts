import boxen from 'boxen';

export default class Banner {
  message: string;
  theme: object;

  constructor(
    message: string,
    primaryColor: string,
    secondaryColor: string,
    isBold?: boolean
  ) {
    this.message = message;
    this.theme = {
      align: 'center',
      padding: 1,
      margin: { top: isBold ? 1 : 0, left: 1, bottom: 1, right: 1 },
      backgroundColor: '#' + primaryColor,
      borderColor:
        primaryColor === secondaryColor ? '#aaa' : '#' + secondaryColor,
      borderStyle: isBold ? 'bold' : 'single'
    };
  }

  print(): void {
    console.log(boxen(this.message, this.theme));
  }
}
