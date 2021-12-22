type Props = {
  name: string;
  onChangeCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<Props> = ({ name, onChangeCheckBox }) => {
  return (
    <label>
      <input onChange={onChangeCheckBox} type="checkbox" name={name} />
      {name}
    </label>
  );
};

export default CheckBox;
