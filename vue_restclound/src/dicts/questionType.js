import Dict from "./";

const dict = new Dict();
dict.data = [
  {
    key: "RadioChoice",
    label: "单选题",
    value: 1
  },
  {
    key: "MultiChoice",
    label: "多选题",
    value: 2
  },
  {
    key: "Judgement",
    label: "判断题",
    value: 3
  },
  {
    key: "ShortAnswer",
    label: "问答题",
    value: 4
  }
];

export default dict;