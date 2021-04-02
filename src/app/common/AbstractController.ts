import * as React from 'react';

export interface ViewStoreState {}

export abstract class AbstractController<S extends ViewStoreState> {
  protected state: S;

  constructor(protected readonly component: React.Component) {
    this.registerToStore();
  }

  protected registerToStore() {}

  protected unregisterFromStore() {}

  protected updateView() {
    this.component.setState(this.state);
  }

  abstract getInitialState(): S;

  onUnmountView() {
    this.unregisterFromStore();
  }

  abstract updateState(values: {});
}
