import boxen from 'boxen';
import Banner from '../src/banner';

describe('Banner', () => {
  it('print - bold', () => {
    console.log = jest.fn();
    const testBanner = new Banner('Foo bar', 'aaa', '000', true);
    testBanner.print();
    expect(console.log).toHaveBeenCalledWith(
      boxen('Foo bar', {
        align: 'center',
        padding: 1,
        margin: { top: 1, left: 1, bottom: 1, right: 1 },
        backgroundColor: '#aaa',
        borderColor: '#000',
        borderStyle: 'bold'
      })
    );
  });

  it('print - same primary and secondary colors', () => {
    console.log = jest.fn();
    const testBanner = new Banner('Foo bar', '000', '000');
    testBanner.print();
    expect(console.log).toHaveBeenCalledWith(
      boxen('Foo bar', {
        align: 'center',
        padding: 1,
        margin: { top: 0, left: 1, bottom: 1, right: 1 },
        backgroundColor: '#000',
        borderColor: '#aaa',
        borderStyle: 'single'
      })
    );
  });
});
