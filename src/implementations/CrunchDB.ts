import { Container } from 'inversify';
import { ICrunchDB } from 'crunchDB/interfaces';

export class CrunchDB implements ICrunchDB {
  protected iocContainer: Container;

  constructor() {
    this.iocContainer = new Container();
  }
}
