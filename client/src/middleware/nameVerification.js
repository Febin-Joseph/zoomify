export function nameVerification(nameValidation) {
    if (nameValidation.length <= 2) {
      return "name must contain atleast three characters"
    } else {
      return "age verification successful"
    }
  }