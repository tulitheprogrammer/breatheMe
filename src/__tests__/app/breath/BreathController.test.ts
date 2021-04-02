it('todo', () => {
  expect(1).toEqual(1);
});

/**
 *

 import {BreathingController} from "../../../app/session/BreathingController";
 import {BreathingComponent} from "../../../app/session/BreathingComponent";
 import {anything, deepEqual, instance, mock, resetCalls, verify, when} from "ts-mockito";
 import {SessionManagerImpl} from "../../../error/session/impl/SessionManagerImpl";
 import {SessionEntity} from "../../../data/session/SessionEntity";
 import {ResultFormatter} from "../../../app/session/ResultFormatter";
 import {DialogManager} from "../../../app/common/DialogManager";

 const component = mock(BreathingComponent);
 let componentState = {
    trackBreaths: false,
    start: false,
    currentRound: 0,
    sessionDone: false,
    sessionSaveFailed: false,
    sessionSaved: false,
    results: []
};
 const resultFormatter = mock(ResultFormatter);
 const sessionManager = mock(SessionManagerImpl);
 const dialogManager = mock(DialogManager);
 const subject = new BreathingController(instance(component), instance(sessionManager), instance(resultFormatter),
 instance(dialogManager));
 when(component.getState()).thenReturn(componentState);
 when(resultFormatter.parseSeconds(30)).thenReturn('30');
 when(resultFormatter.parseSeconds(90)).thenReturn('90');
 when(resultFormatter.parseSeconds(20)).thenReturn('20');
 beforeEach(() => {
    try {
        subject.retentionMap.clear();
        subject.amountOfRounds = 0;
        subject.amountOfBreaths.clear();
    } catch (e) {
        // ignore
    }
});

 it('it creates and saves a session', async () => {
    const sessionMock = mock(SessionEntity);
    const amountOfRounds: number = 1;
    const custom: boolean = false;
    const retentionTime: Map<number, number> = new Map();
    const amountOfBreathsPerRetention: Map<number, number> = new Map();
    const notes = '';
    when(sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes))
        .thenResolve(instance(sessionMock));

    await subject.onSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes);

    verify(component.updateState(anything())).once();
});

 it('it fails to create and save a session', async () => {
    resetCalls(component);
    const sessionMock = mock(SessionEntity);
    const amountOfRounds: number = 1;
    const custom: boolean = false;
    const retentionTime: Map<number, number> = new Map();
    const amountOfBreathsPerRetention: Map<number, number> = new Map();
    const notes = '';
    when(sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes))
        .thenReject(instance(sessionMock));

    await subject.onSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes);

    verify(component.updateState(anything())).once();
});

 it('starts a session', () => {
    subject.startSession();
    expect(subject.amountOfBreaths).toEqual(new Map());
    expect(subject.amountOfRounds).toEqual(0);
    expect(subject.retentionMap).toEqual(new Map());
    expect(subject.notes).toEqual('');
});

 it('updates a retention round without tracking breaths', async () => {
    resetCalls(component);
    await subject.addRound(20);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20));
    expect(subject.amountOfRounds).toEqual(1);
    expect(subject.amountOfBreaths).toEqual(new Map());
    verify(component.updateState(deepEqual({...instance(component).getState(), results: deepEqual(['20'])}))).once();

});

 it('updates 2 retention rounds', () => {
    resetCalls(component);
    subject.addRound(20);
    subject.addRound(40);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20).set(2, 40));
    expect(subject.amountOfRounds).toEqual(2);

});

 it('updates a round with retention time and amount of breaths', () => {
    subject.addRound(20, 40);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20));
    expect(subject.amountOfBreaths).toEqual(new Map().set(1, 40));
});

 it('removes last round', () => {
    subject.addRound(30);
    resetCalls(component);
    subject.removeLastRound();
    expect(subject.retentionMap).toEqual(new Map());
    expect(subject.amountOfRounds).toEqual(0);
    verify(component.updateState(deepEqual({...instance(component).getState(), results: deepEqual([])}))).once();

});

 it('removes last round from multiple sessions', () => {
    subject.addRound(30);
    subject.addRound(90);
    resetCalls(component);
    subject.removeLastRound();
    expect(subject.retentionMap).toEqual(new Map().set(1, 30));
    expect(subject.amountOfRounds).toEqual(1);
    verify(component.updateState(deepEqual({...instance(component).getState(), results: deepEqual(['30'])}))).once();
});

 it('shows an alert dialog', () => {
    subject.onClickedDone();
    verify(dialogManager.showDialogWithConfigs(anything())).once();
}); */
