import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { errorAtom, hiddenAtom, searchTypedAtom } from "../atom";

const MainInput = styled.div`
  position: relative;
  top: calc(50% - 50px);
  transform: translateY(-50%);
  opacity: 1;
  transition: opacity 0.6s;
`;
const Main = styled.section`
  position: relative;
  width: 580px;
  max-width: 90%;
  margin: 15px auto 5px;
  .error {
    margin-top: 10px;
    color: red;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 15px 15px 15px 20px;
  border: 0;
  border-radius: 4px;
  background: #fff;
  color: #292f33;
  &::placeholder {
    color: #8899a6;
    font-weight: 300;
    letter-spacing: 0.0357em;
    text-overflow: ellipsis !important;
  }
`;

const InputBox = () => {
  const setId = useSetRecoilState(searchTypedAtom);
  const setHidden = useSetRecoilState(hiddenAtom);
  const error = useRecoilValue(errorAtom);
  const onEnter = (event: {
    key: string;
    currentTarget: { value: string | ((currVal: string) => string) };
  }) => {
    if (event.key === "Enter") {
      setId(event.currentTarget.value);
      setHidden("hidden active");
    }
  };
  return (
    <>
      <MainInput>
        <h1 className="title">Twitter Profile Viewer</h1>
        <Main>
          <Input
            type="text"
            placeholder="Enter your Twitter UserId"
            onKeyPress={onEnter}
            list="options"
          />
          <div className="error">{error}</div>
          <datalist id="options">
            <option value="@twitterdev"></option>
            <option value="twitterdev"></option>
          </datalist>
        </Main>
      </MainInput>
    </>
  );
};
export default InputBox;
