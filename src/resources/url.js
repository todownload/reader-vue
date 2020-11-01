
const PREFIX = "/reader";

const FIND_BY_ID = "/findById";
const FIND_ALL = "/findAll";
const SAVE = "/save";
const UPDATE = "/update";
const DELETE = "/delete";

/* Book API*/
const BOOK_PREFIX = PREFIX+"/book";
const BOOK_URL_GENERATOR = function(suffix){
    return BOOK_PREFIX + suffix;
}
const BG = BOOK_URL_GENERATOR;
export const FIND_BOOK_ID = BG(FIND_BY_ID);
export const FIND_BOOK_ALL = BG(FIND_ALL);
export const FIND_BOOK_KEYWORD = BG("/findByKeyword");
export const FIND_BOOK_AUTHOR_KEYWORD = BG("/findByAuthorKeyword");
export const FIND_BOOK_AUTHOR_ID = BG("/findByAuthorId");
export const SAVE_BOOK = BG(SAVE);
export const UPDATE_BOOK = BG(UPDATE);
export const DELETE_BOOK = BG(DELETE)


/* Chapter API */
const CHAPTER_PREFIX = PREFIX + "/chapter";
const CHAPTER_URL_GENERATOR = function(suffix){
    return CHAPTER_PREFIX+suffix;
}
const CG = CHAPTER_URL_GENERATOR;
export const FIND_CHAPTER_ID = CG(FIND_BY_ID);
export const FIND_CHAPTER_BOOK_ID = CG("/findByBookId");
export const FIND_CHAPTER_BOOK_ID_KEYWORD = CG("/findByBookIdAndKeyword");
export const SAVE_CHAPTER = CG(SAVE);
export const UPDATE_CHAPTER = CG(UPDATE);
export const DELETE_CHAPTER = CG(DELETE)


