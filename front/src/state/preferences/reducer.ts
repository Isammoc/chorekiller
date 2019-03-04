export type PreferencesState = {
  projectIds: number[];
};

const initialState: PreferencesState = {
  projectIds: [1], // XXX projectId
};

export default (state: PreferencesState = initialState, action: CKAction) => {
  return state;
};
