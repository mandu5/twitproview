import { atom } from "recoil";

export const searchTypedAtom = atom<string>({
  key: "searchTyped",
  default: "",
});

export const hiddenAtom = atom<string>({
  key: "hidden",
  default: "hidden",
});

export const errorAtom = atom<string>({
  key: "error",
  default: "",
});
