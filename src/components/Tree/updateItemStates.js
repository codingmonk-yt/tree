import { Item } from "../CheckboxList";
import { CheckboxState } from "./Tree";

export const updateItemStates = (oldState, items, clickedId) => {
  const newState = oldState.map((i) => ({ ...i }));
  // getters
  const getItemState = (id) => {
    return newState.find((i) => i.id === id).state;
  };
  // setters
  const updateParent = (id) => {
    const item = items.find((i) => i.id === id);
    const parent = items.find((i) => i.id === item.parentId);
    if (!parent) return;
    const childIds = items
      .filter((i) => i.parentId === parent.id)
      .map((i) => i.id);
    const childStates = childIds.map((childId) => getItemState(childId));
    if (
      childStates.length ===
      childStates.filter((s) => s === CheckboxState.CHECKED).length
    ) {
      newState.find((i) => i.id === parent.id).state = CheckboxState.CHECKED;
    } else if (
      childStates.length ===
      childStates.filter((s) => s === CheckboxState.UNCHECKED).length
    ) {
      newState.find((i) => i.id === parent.id).state = CheckboxState.UNCHECKED;
    } else {
      newState.find((i) => i.id === parent.id).state =
        CheckboxState.INDETERMINATE;
    }
    updateParent(parent.id);
  };
  const setUnchecked = (id) => {
    newState.find((i) => i.id === id).state = CheckboxState.UNCHECKED;
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setUnchecked(childId));
    updateParent(id);
  };
  const setChecked = (id) => {
    newState.find((i) => i.id === id).state = CheckboxState.CHECKED;
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setChecked(childId));
    updateParent(id);
  };
  // actual logic
  const itemState = getItemState(clickedId);
  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(clickedId);
  } else {
    setChecked(clickedId);
  }
  return newState;
};
