import { SessionRequest } from '../../model/request/SessionRequest';
import { RoundEntity } from '../../model/session/RoundEntity';

const id = 1;
const rounds = [new RoundEntity(1, 30, 40), new RoundEntity(2, 10, 20)];
const notes = 'any note here';

it('parses a correct request', () => {
  const subject = new SessionRequest(id, rounds, notes);
  expect(subject.endpoint).toEqual('session/create');
  expect(subject.method).toEqual('POST');
  expect(subject.body).toEqual(
    JSON.stringify({
      id: 1,
      rounds: [
        {
          roundOrder: 1,
          breathes: 30,
          retentionTime: 40,
          inhaleHoldDuration: 0,
          totalTime: 0,
        },
        {
          roundOrder: 2,
          breathes: 10,
          retentionTime: 20,
          inhaleHoldDuration: 0,
          totalTime: 0,
        },
      ],
      notes: 'any note here',
    }),
  );
});
