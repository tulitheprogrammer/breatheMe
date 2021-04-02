import { ResultFormatter } from '../../../app/session/ResultFormatter';

const subject = new ResultFormatter();

it('parses a second', () => {
  const result = subject.parseSeconds(1);
  expect(result).toEqual('00:01');
});

it('parses 10 seconds', () => {
  const result = subject.parseSeconds(10);
  expect(result).toEqual('00:10');
});

it('parses a minute', () => {
  const result = subject.parseSeconds(60);
  expect(result).toEqual('01:00');
});

it('parses 10 minutes', () => {
  const result = subject.parseSeconds(600);
  expect(result).toEqual('10:00');
});

it('parses 10 minutes and 10 seconds', () => {
  const result = subject.parseSeconds(610);
  expect(result).toEqual('10:10');
});

it('parses 1 minutes and 45 seconds', () => {
  const result = subject.parseSeconds(105);
  expect(result).toEqual('01:45');
});
