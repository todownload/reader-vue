
const PREFIX = "/reader";

const FIND_BY_ID = "/findById";
const FIND_ALL = "/findAll";
const SAVE = "/save";
const UPDATE = "/update";

/* Author API */
const AUTHOR_PREFIX = PREFIX + "/author";
const AUTHOR_URL_GENERATOR = function(suffix){
    return AUTHOR_PREFIX + suffix;
}
const AG = AUTHOR_URL_GENERATOR;
export const FIND_AUTHOR_ID = AG(FIND_BY_ID);
export const FIND_AUTHOR_ALL = AG(FIND_ALL);
export const FIND_AUTHOR_KEYWORD = AG("/findByKeyword");
export const SAVE_AUTHOR = AG(SAVE);
export const UPDATE_AUTHOR = AG(UPDATE);

/* User API */
const USER_PREFIX = PREFIX + "/user";
const USER_URL_GENERATOR = function(suffix){
    return USER_PREFIX + suffix;
};
const UG = USER_URL_GENERATOR;
export const REGISTER_USER_EMAIL = UG("/register/email");
export const REGISTER_USER_PHONE = UG("/register/phone");
export const LOGIN_USER_EMAIL = UG("/login/email");
export const LOGIN_USER_PHONE = UG("/login/phone");
export const UPDATE_USER_NAME = UG("/update/name");
export const UPDATE_USER_PWD = UG("/update/pwd");


/* Book API*/
const BOOK_PREFIX = PREFIX + "/book";
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


