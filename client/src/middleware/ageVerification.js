export function ageVerification(birthYear) {
    if (!birthYear || isNaN(birthYear)) {
      return 'Please enter a valid year of birth.';
    } else {
      const currentYear = new Date().getFullYear();
      const enteredYear = parseInt(birthYear);
      const userAge = currentYear - enteredYear;
  
      if (userAge >= 18 && userAge <= 150) {
        return 'Age verification successful! You are eligible to sign up.';
      } else if (userAge < 18) {
        return 'You must be 18 years old or older to sign up.';
      } else {
        return 'Invalid year of birth. Please enter a valid year.';
      }
    }
  }