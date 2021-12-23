type Props = {
  setAddress: (value: string) => void;
  onClickSearch: () => void;
};

const SearchContent: React.FC<Props> = ({ setAddress, onClickSearch }) => {
  return (
    <>
      <input type="text" onChange={(e) => setAddress(e.target.value)} />
      <button type="button" onClick={onClickSearch}>
        探す
      </button>
    </>
  );
};

export default SearchContent;
