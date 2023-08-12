import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export var user = {
  id: '',
  currentBook:'',
  bookAndPage:[],
  currentChapter: '',
  currentPage:0,
  currentMode: 'dark',
  currentFontSize: 16,
  currentFontType: 'serif',
  kittyName: '',
  kittyVisibilityStatus: true,
}

export function createUserID() {
  user.id = 'jrmuser-' + uuidv4()
}
export function addBook(bid, tp){
    let obj = {bid: bid, pnb: 0, tp: tp}
    user.bookAndPage.push(obj)
    AddToLocalStorage()
}
export function removeBook(bid, array){

  var elementIndex = array.findIndex(function(element) {
      return element.bid === bid;
  });    
  if (elementIndex !== -1) {
    array.splice(elementIndex, 1);
  } 
  user.bookAndPage = array
  AddToLocalStorage()
  return array
}

export function updateCurrentBook(id) {
  user.currentBook = id
  AddToLocalStorage()
}
export function updateCurrentPage(n) {
    let found = user.bookAndPage.find(x => x.bid == user.currentBook)
    if(found){
        found.pnb = n
    }
  AddToLocalStorage()
}
export function updateCurrentMode(m) {
  user.currentMode = m
  AddToLocalStorage()
}
export function updateFontSize(s) {
  user.currentFontSize = s
  AddToLocalStorage()
}
export function updateFontType(t) {
  user.currentFontType = t
  AddToLocalStorage()
}
export function updateKittyName(k) {
  user.kittyName = k
  AddToLocalStorage()
}
export function updateKittyVisibility(v) {
  user.kittyVisibilityStatus = v
  AddToLocalStorage()
}
export function updateTotalPages(bid, p){
  let found = user.bookAndPage.find(x => x.bid == bid)
  if(found){
    found.tp = p
  }
  AddToLocalStorage()
}



export function AddToLocalStorage() {
  try {
    localStorage.setItem("JRMUSER", JSON.stringify(user));
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
      alert('Quota exceeded!');
    }
  }

}
