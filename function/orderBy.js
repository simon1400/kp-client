const orderBy = (x,y) => {
  if (x.label < y.label)
    return -1;
  if (x.label > y.label)
    return 1;
  return 0;
}

export default orderBy