export function ageVerification(birthYear) {
  if (!birthYear || isNaN(birthYear)) {//checks if the input value is  empty or not a number
    return 'Please enter a valid year of birth.';
  } else {
    const currentYear = new Date().getFullYear();//taken the current year
    const enteredYear = parseInt(birthYear);//taking the user entered year
    const userAge = currentYear - enteredYear;//current year minus user entered year for gettingthe user age

    if (userAge >= 18 && userAge <= 150) {
      return 'Age verification successful.';
    } else if (userAge < 18 || userAge >= 1) {
      return 'You must be 18 years old or older to sign up.';
    } else {
      return 'Invalid year of birth. Please enter a valid year.';
    }
  }
}