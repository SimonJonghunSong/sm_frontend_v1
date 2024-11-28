const regexPatterns = {
  onlyEnglishRegex: /^[a-zA-Z]*$/, // 영어 대소문자만 허용
  alphanumeric: /^[a-zA-Z0-9]*$/, // 영어 대소문자와 숫자만 허용
  onlyNumbers: /^\d*$/, // 숫자만 허용
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 형식
  onlyNumbersAndSpecialCharsRegex: /^[0-9!@#$%^&*(),.?":{}|<>_-]*$/, // 숫자, 특수문자만 허용
  englishWithSpacesRegex: /^[a-zA-Z\s]*$/, // 영어 대소문자와 공백 허용
};

export default regexPatterns;
