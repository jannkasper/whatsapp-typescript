import React from "react";
import styled from "@emotion/styled";
import { Search } from "../../icons"

interface SearchProps {
    placeHolder: string,
    searchText: string,
    setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<SearchProps> = ({ placeHolder, searchText, setSearchText }) => {
    return (
        <SearchWrapper>
            <ButtonIcon>
                <Search />
            </ButtonIcon>
            <InputWrapper>
                <input placeholder={placeHolder}
                       value={searchText}
                       onChange={e => setSearchText(e.target.value)} />
            </InputWrapper>
        </SearchWrapper>
    )
}

const SearchWrapper = styled("div")`
  position: relative;
  box-sizing: border-box;
  flex: none;

  height: 49px;
  border-bottom: 1px solid #242d32;
  background-color: #131c21;
  transition: box-shadow .18s ease-out,background-color .25s ease-out;
`

const ButtonIcon = styled("button")`
  position: absolute;
  top: 12px;
  z-index: 100;
  width: 24px;
  height: 24px;

  left: 24px;

  outline: none;
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  color: #73787b;
`

const InputWrapper = styled("div")`
  padding: 0 12px 0 12px;

  input {
    position: relative;
    flex-grow: 1;
    width: 100%;
    top: 7px;
    height: 35px;
    padding-left: 70px;

    border: none;
    border-radius: 18px;
    font-size: 15px;

    box-sizing: border-box;
    background-color: #323739;
    color: #f1f1f2;

    &:focus {
      outline: none;
    }
  }
`

export default SearchInput
