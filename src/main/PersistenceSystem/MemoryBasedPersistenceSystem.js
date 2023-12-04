import { PersistenceSystem } from "./PersistenceSystem.js";

/* This should be an implementation of PersistenceSystem, but JS doesn't allow "implements" 
   and TS does, so for this stage i'll extend it. -asalvidio*/

export class MemoryBasedPersistenceSystem extends PersistenceSystem {
  constructor() {
    super();
    this.contents = [];
  }
  add = (anObject) => {
    this.contents.push(anObject);
  };
  update = (anOriginalObject, anUpdatedObject) => {
    anUpdatedObject.id = anOriginalObject.id;
    const index = this.contents.indexOf(anOriginalObject);
    if (~index) {
      this.contents[index] = anUpdatedObject;
    }
  };
  delete = (anObject) => {
    this.contents = this.contents.filter((object) => object !== anObject);
  };
  getAll = () => this.contents;
  getFilteredBy = (aCriteria) => this.contents.find(aCriteria);
  anySatisfy = (aCriteria) => this.contents.some(aCriteria);
}
