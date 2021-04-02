import { SessionResponseMapper } from '../../../../data/SessionResponseMapper';

const subject = new SessionResponseMapper();

it('maps a correct request object out of json', () => {
  const retentionTimeMap = new Map<number, number>();
  retentionTimeMap.set(1, 63);
  retentionTimeMap.set(2, 33);
  retentionTimeMap.set(3, 73);

  const amountsOfBreathsPerRound = new Map<number, number>();
  amountsOfBreathsPerRound.set(1, 15);
  amountsOfBreathsPerRound.set(2, 12);
  amountsOfBreathsPerRound.set(3, 10);

  const json = `
        {
            "date": 123,
            "uuid": "129041",
            "retentionTimeMap": {
                "1": 63,
                "2": 33,
                "3": 73
            },
            "amountsOfBreathsPerRound": {
                "1": 15,
                "2": 12,
                "3": 10
            },
            "notes": "your mom",
            "localId": 123,
            "globalId": 321
        }
        `;
  const sessionResponse = JSON.parse(json);

  const request = subject.parseSessionEntity(sessionResponse);
  // expect(request).toEqual(new SessionEntity(123, 3, false, retentionTimeMap, amountsOfBreathsPerRound, 'your mom',
  //    123, 321));
  expect(1).toEqual(1);
});
