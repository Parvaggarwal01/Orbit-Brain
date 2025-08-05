export const random = (len: number): string => {
  let options = "askdfhalsfhassoifoid";
  let length = options.length;

  let result = "";
  for(let i = 0; i<len; i++){
    result += options[Math.floor(Math.random() * length)]
  }
  return result;
}