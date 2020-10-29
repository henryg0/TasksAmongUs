export default function getColors(num) {
  const colors = [
    "#D8E2DC",
    "#FFE5D9",
    "#FBFAF0",
    "#FFE9EE",
    "#F0FFFF",
    "#F0F8FF",
    "#FAEBD7",
  ]
  
  let arr = [];
  let j = 2;
  for (let i = 0; i < num; i++) {
    arr.push(colors[j])
    j += Math.floor(Math.random() * (colors.length - 1)) + 1
    j = j % (colors.length);
  }
  return arr;
}