import styled from 'styled-components';
//#region SearchBar
const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 50px;
  padding: 20px 30px;
  border: none;
  transition: 0.2s;
  font-size: 25px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
`;

const SearchButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  margin: 12px;
  border-radius: 50px;
  right: 0px;
  border: none;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  transition: 0.2s all;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 0 10px black;

  &:hover {
    background-color: #0056b3;
  }
`;
//#endregion
export default function SearchBar(props: any) {
  let searchInput: String;

  return (
    <StyledSearchBar dir='rtl' className="SearchBar">
      <SearchInput onChange={(e) => { searchInput = e.target.value }} dir='ltr' type="text" placeholder="Search..." className="Input__Box" />
      <SearchButton onClick={() => { props.setSearchBarValue(searchInput) }} dir='rtl' type="submit" className="Search__Button">🔎</SearchButton>
    </StyledSearchBar>
  );
}
