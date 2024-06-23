export const MESSAGE_CODES = {
  SUCCESS: "SUCCESS",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  USER: {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_FIRST_NAME: 'INVALID_FIRST_NAME',
    INVALID_LAST_NAME: 'INVALID_LAST_NAME',
    REQUIRED_PASSWORD: 'REQUIRED_PASSWORD',
    PASSWORD_MIN_LENGTH: 'PASSWORD_MIN_LENGTH',
    CONFIRM_PASSWORD_NOT_MATCH: 'CONFIRM_PASSWORD_NOT_MATCH',
    INVALID_ROLE: 'INVALID_ROLE',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    REQUIRED_EMAIL: 'REQUIRED_EMAIL',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INVALID_USER_ID: 'INVALID_USER_ID'
  },
  PRODUCT: {
    INVALID_PRODUCT_NAME: 'INVALID_PRODUCT_NAME',
    INVALID_PRODUCT_PRICE: 'INVALID_PRODUCT_PRICE',
    INVALID_PRODUCT_DESCRIPTION: 'INVALID_PRODUCT_DESCRIPTION',
    INVALID_QUANTITY: 'INVALID_QUANTITY',
    PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND'
  },
  ORDER: {
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    INVALID_STATUS: 'INVALID_STATUS',
    INVALID_ORDER_ITEMS: 'INVALID_ORDER_ITEMS',
    INVALID_PRODUCT_ID: 'INVALID_PRODUCT_ID',
    INVALID_QUANTITY: 'INVALID_QUANTITY',
    INVALID_UNIT_PRICE: 'INVALID_UNIT_PRICE',
    INVALID_DESTINATION: 'INVALID_DESTINATION'
  },
  SHARED: {
    INVALID_PAGE: 'INVALID_PAGE',
    INVALID_PAGE_SIZE: 'INVALID_PAGE_SIZE'
  }
};
