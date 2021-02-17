import chalk from 'chalk';
import Message from '../src/message';

describe('Message', () => {
  it('get', () => {
    const testMessage = new Message('fff', 'underline', 'Foo bar');
    const result = testMessage.get();
    expect(result).toEqual(chalk.underline.hex('fff')('Foo bar'));
  });

  it('print', () => {
    console.log = jest.fn();
    const testMessage = new Message('fff', null, 'Foo bar');
    testMessage.print();
    expect(console.log).toHaveBeenCalledWith(chalk.hex('fff')('Foo bar'));
  });
});
