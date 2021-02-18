export const setItem = (data: any) => {
  localStorage.setItem("AppData", JSON.stringify(data));
};
export const getItem = () => {
  const storage = localStorage.getItem("AppData");
  return storage && JSON.parse(storage);
};
