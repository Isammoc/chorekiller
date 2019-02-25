import { GroceryState } from '../../model';

const getItemsForList =
  (state: GroceryState) =>
    (listId: number) =>
      (state.lists[listId] && state.lists[listId].current)
        ? state.lists[listId].current.items.map((id) => state.items[id]).sort((a, b) => a.name.localeCompare(b.name))
        : []
  ;

const getList =
  (state: GroceryState) =>
    (listId: number) => {
      const current = state.lists[listId] && state.lists[listId].current;
      return {
        ...current,
        items: getItemsForList(state)(listId),
      };
    };

export default (state: GroceryState) => ({
  getItemsForList: getItemsForList(state),
  getList: getList(state),
});
