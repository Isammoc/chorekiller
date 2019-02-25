import { GroceryState } from '../../model';

const getItemsForList =
  (state: GroceryState) =>
    (listId: number) =>
      state.current ? state.current.sort((a, b) => a.name.localeCompare(b.name)) : []
  ;

export default (state: GroceryState) => ({
  getItemsForList: getItemsForList(state),
});
