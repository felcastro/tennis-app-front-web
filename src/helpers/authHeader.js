export default (contentType = "application/json") => {
  return {
    Authorization: localStorage.getItem("user-token"),
    "Content-Type": contentType,
  };
};
