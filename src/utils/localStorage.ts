export const setStorage = (data: any) => {
  localStorage.setItem("AppData", JSON.stringify(data));
};
export const getStorage = () => {
  const storage = localStorage.getItem("AppData");
  return storage && JSON.parse(storage);
};
