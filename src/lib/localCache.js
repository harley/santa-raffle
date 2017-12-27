export default {
  set: (id, data) => localStorage.setItem(id, JSON.stringify(data)),
  get: (id, data) => JSON.parse(localStorage.getItem(id))
}