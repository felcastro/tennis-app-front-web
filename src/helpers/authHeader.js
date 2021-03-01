export default (contentType = "application/json") => ({
  Authorization: localStorage.getItem("user-token"),
  "Content-Type": contentType,
});
