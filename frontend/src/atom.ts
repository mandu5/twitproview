import { atom } from "recoil";

export const searchTypedAtom = atom({
  key: "typed",
  default: "",
});

export const hiddenAtom = atom({
  key: "hidden",
  default:"hidden",
})

export const errorAtom = atom({
  key: "error",
  default:"",
})