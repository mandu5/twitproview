import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchTypedAtom, hiddenAtom, errorAtom } from "../atom";

const InputContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    padding: 10px 15px;
    border-radius: 999px;
    border: 2px solid #1da1f2;
    font-size: 16px;
    width: 300px;
    max-width: 80%;
    outline: none;
    background-color: #fff;
    color: #333;

    &:focus {
      border-color: #0d8ddb;
    }
  }

  button {
    background-color: #1da1f2;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 999px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #0d8ddb;
    }
  }

  .error-message {
    color: #e0245e;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
  }
`;

function InputBox() {
  const [searchTyped, setSearchTyped] = useRecoilState(searchTypedAtom);
  const setHidden = useSetRecoilState(hiddenAtom);
  const errorMessage = useRecoilState(errorAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTyped(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHidden("active");
  };

  return (
    <InputContainer>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Enter Twitter username (e.g., twitterdev)"
          value={searchTyped}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {errorMessage[0] && (
        <div className="error-message">{errorMessage[0]}</div>
      )}
    </InputContainer>
  );
}

export default InputBox;
