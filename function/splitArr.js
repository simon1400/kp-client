const splitArr = (array, parts) => {
  const copyArray = [...array]
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(copyArray.splice(0, Math.ceil(copyArray.length / i)));
  }
  return result;
}

export default splitArr