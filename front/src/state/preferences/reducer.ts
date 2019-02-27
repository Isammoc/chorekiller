export type PreferencesState = {
  listIds: number[];
};

const initialState: PreferencesState = {
  listIds: [1], // XXX listId
};

export default (state: PreferencesState = initialState, action: CKAction) => {
  return state;
};
