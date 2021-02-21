import boxen from 'boxen';

export default class Banner {
  message: string;
  theme: {
    align: 'center';
    backgroundColor: string;
    borderColor: string;
    borderStyle: 'bold' | 'single';
    margin: { bottom: number; left: number; right: number; top: number };
    padding: number;
  };

  constructor(
    message: string,
    primaryColor: string,
    secondaryColor: string,
    isBold?: boolean
  ) {
    this.message = message;
    this.theme = {
      align: 'center',
      backgroundColor: '#' + primaryColor,
      borderColor:
        primaryColor === secondaryColor ? '#aaa' : '#' + secondaryColor,
      borderStyle: isBold ? 'bold' : 'single',
      margin: { bottom: 1, left: 1, right: 1, top: isBold ? 1 : 0 },
      padding: 1
    };
  }

  print(): void {
    console.log(boxen(this.message, this.theme));
  }
}
