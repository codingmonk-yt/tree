import { useCallback, useState } from "react";
import listItems from "../../data";

import CheckboxList from "../CheckboxList";
import { updateItemStates } from "./updateItemStates";

const CheckboxState = {
  UNCHECKED: "UNCHECKED",
  CHECKED: "CHECKED",
  INDETERMINATE: "INDERTMINATE",
};

const defaultItemStates = listItems.map((i) => ({
  id: i.id,
  state: "CHECKED",
}));

const Tree = () => {
  const [itemStates, setItemStates] = useState(defaultItemStates);
  const getStateForId = useCallback(
    (id) => {
      return itemStates.find((i) => i.id === id).state;
    },
    [itemStates]
  );
  const clickHandler = useCallback(
    (id) => setItemStates(updateItemStates(itemStates, listItems, id)),
    [itemStates]
  );
  return (
    <CheckboxList
      items={listItems}
      onClick={clickHandler}
      getStateForId={getStateForId}
    />
  );
};

export default Tree;

export { CheckboxState };
