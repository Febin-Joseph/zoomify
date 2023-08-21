export function nameVerification(nameValidation) {
    if (nameValidation.length <= 2) {
      return "name must contain atleast two characters"
    } else {
      return "age verification successful"
    }
  }