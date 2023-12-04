/*This represents an interface for Persistence, but JS doesn't allow interfaces so,
 i implemented it as a class. -asalvidio*/

export class PersistenceSystem {
  add = (anObject) => {};
  update = (anOriginalObject, anUpdatedObject) => {};
  delete = (anObject) => {};
  getAll = () => {};
  getFilteredBy = (aCriteria) => {};
}
