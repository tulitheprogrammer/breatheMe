import { SessionEntityFactory } from '../../model/session/SessionEntityFactory';
import { UUIDBuilder } from '../../data/repository/UUIDBuilder';
import { instance, mock, when } from 'ts-mockito';
import { SessionEntity } from '../../model/session/SessionEntity';
import { RoundEntity } from '../../model/session/RoundEntity';

const uuidBuilder = mock(UUIDBuilder);
const subject = new SessionEntityFactory(instance(uuidBuilder));

it('builds a valid entity out of values', () => {
  const notes = '23';
  const date = Date.now();
  const breathes = new Map([
    [1, 30],
    [2, 15],
  ]);
  const retentions = new Map([
    [1, 14],
    [2, 15],
  ]);
  when(uuidBuilder.buildUUID()).thenReturn('1');
  const result = subject.createFromValues(notes, breathes, retentions, date);

  expect(result).toEqual(
    new SessionEntity(
      '1',
      date,
      [new RoundEntity(1, 30, 14), new RoundEntity(2, 15, 15)],
      notes,
    ),
  );
});
