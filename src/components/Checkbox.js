import { Checkbox as AntCheckbox } from "antd";

const Checkbox = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
}) => {
  return (
    <AntCheckbox
      onChange={onClick}
      checked={isChecked}
      indeterminate={isIndeterminate}
    />
  );
};

export default Checkbox;
