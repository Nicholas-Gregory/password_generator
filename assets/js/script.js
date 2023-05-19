var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = lowercase.join().toUpperCase().split(",");
var numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var special = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

function promptLength() {
  var length = prompt("Input a number between 8 and 128 for password length:");
  return length;
}

function confirmCharacters() {
  var cases = [false, false, false, false]

  cases[0] = confirm("Use lowercase characters?");
  cases[1] = confirm("Use uppercase characters?");
  cases[2] = confirm("Use numeric characters?");
  cases[3] = confirm("Use special characters?");

  return cases;
}

function replace(string, index, replacementChar) {
  return string.substring(0, index) + replacementChar + string.substring(index + 1);
}

function generatePassword() {
  // Ask user for desired length of password, making sure that it is within the required range
  var length = promptLength();
  while (length < 8 || length > 128 || isNaN(length)) {
    alert("Password length must be between 8 and 128 characters!")
    length = promptLength();
  }

  // Ask user what classes of characters are desired in the password, making sure at least one class is chosen
  var characterClasses = confirmCharacters();
  while(!characterClasses[0] && !characterClasses[1] && !characterClasses[2] && !characterClasses[3]) {
    alert("Must choose at least 1 character class");
    characterClasses = confirmCharacters();
  }

  // Generate array of characters that will be randomly selected from during password generation
  var characters = [];
  if (characterClasses[0]) {
    characters = characters.concat(lowercase);
  }
  if (characterClasses[1]) {
    characters = characters.concat(uppercase);
  }
  if (characterClasses[2]) {
    characters = characters.concat(numeric);
  }
  if (characterClasses[3]) {
    characters = characters.concat(special);
  }

  // Generate the password at the selected length using the selected classes of characters
  var password = "";
  for (var i = 0; i < length; i++) {
    var newCharacter = characters[Math.floor(Math.random() * characters.length)];
    password = password.concat(newCharacter);
  }
  // Make another pass through the generated password to make sure at least one of the characters from the chosen classes is represented
  var containsLowercase = false;
  if (characterClasses[0]) {    
    for (var i = 0; i < lowercase.length; i++) {
      if (password.includes(lowercase[i])) {
        containsLowercase = true;
        break;
      }
    }
  }
  var containsUppercase = false;
  if (characterClasses[1]) {
    for (var i = 0; i < uppercase.length; i++) {
      if (password.includes(uppercase[i])) {
        containsUppercase = true;
        break;
      }
    }
  }
  var containsNumeric = false;
  if (characterClasses[2]) {
    for (var i = 0; i < numeric.length; i++) {
      if (password.includes(numeric[i])) {
        containsNumeric = true;
        break;
      }
    }
  }
  var containsSpecial = false;
  if (characterClasses[3]) {
    for (var i = 0; i < special.length; i++) {
      if (password.includes(special[i])) {
        containsSpecial = true;
        break;
      }
    }
  }
  // Replace a random character with one from the desired class, making sure we don't overwrite the changes we already made.
  var usedIndices = [];
  if (!containsLowercase && characterClasses[0]) {
    var index = Math.floor(Math.random() * length);
    while(usedIndices.includes(index)) {
      index = Math.floor(Math.random() * length);
    }
    usedIndices.push(index);
    replace(password, index, lowercase[Math.floor(Math.random() * lowercase.length)]);
  }
  if (!containsUppercase && characterClasses[1]) {
    index = Math.floor(Math.random() * length);
    while (usedIndices.includes(index)) {
      index = Math.floor(Math.random() * length);
    }
    usedIndices.push(index);
    replace(password, index, uppercase[Math.floor(Math.random() * lowercase.length)]);
  }
  if (!containsNumeric && characterClasses[2]) {
    index = Math.floor(Math.random() * length);
    while (usedIndices.includes(index)) {
      index = Math.floor(Math.random() * length);
    }
    usedIndices.push(index);
    replace(password, index, numeric[Math.floor(Math.random() * numeric.length)]);
  }
  if (!containsSpecial && characterClasses[3]) {
    index = Math.floor(Math.random() * length);
    while (usedIndices.includes(index)) {
      index = Math.floor(Math.random() * length);
    }
    usedIndices.push(index);
    replace(password, index, special[Math.floor(Math.random() * special.length)]);
  }

  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
