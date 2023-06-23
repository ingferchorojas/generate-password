document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos de la interfaz
  var passwordInput = document.getElementById("password-input");
  var lengthInput = document.getElementById("length-input");
  var uppercaseCheckWide = document.getElementById("uppercase-check-wide");
  var lowercaseCheckWide = document.getElementById("lowercase-check-wide");
  var numbersCheckWide = document.getElementById("numbers-check-wide");
  var symbolsCheckWide = document.getElementById("symbols-check-wide");
  var copyButtonWide = document.getElementById("copy-button-wide");
  var reloadButtonWide = document.getElementById("reload-button-wide");

  // Generar una contraseña aleatoria al cargar la página
  generatePassword();

  // Función para generar una contraseña aleatoria
  function generatePassword() {
    var maxLength = 100; // Número máximo permitido
    var minLength = 1;
    var length = parseInt(lengthInput.value);
    
    // Verificar si el valor de longitud supera el máximo permitido
    if (length > maxLength) {
      length = maxLength; // Establecer la longitud al valor máximo permitido
      lengthInput.value = maxLength; // Actualizar el valor del input
    }

    if (length < minLength) {
      length = minLength;
      lengthInput.value = minLength;
    }

    // Verificar si el campo de entrada de longitud está vacío
    if (isNaN(length)) {
      passwordInput.value = ""; // Limpiar el campo de contraseña
      return; // Salir de la función
    }

    var useUppercase = uppercaseCheckWide.checked;
    var useLowercase = lowercaseCheckWide.checked;
    var useNumbers = numbersCheckWide.checked;
    var useSymbols = symbolsCheckWide.checked;

    var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    var numbersChars = "0123456789";
    var symbolsChars = "!@#$%^&*()";
    var password = "";

    if (useUppercase) {
      password += getRandomCharFrom(uppercaseChars);
    }

    if (useLowercase) {
      password += getRandomCharFrom(lowercaseChars);
    }

    if (useNumbers) {
      password += getRandomCharFrom(numbersChars);
    }

    if (useSymbols) {
      password += getRandomCharFrom(symbolsChars);
    }

    while (password.length < length) {
      var charPool = "";

      if (useUppercase) {
        charPool += uppercaseChars;
      }

      if (useLowercase) {
        charPool += lowercaseChars;
      }

      if (useNumbers) {
        charPool += numbersChars;
      }

      if (useSymbols) {
        charPool += symbolsChars;
      }

      if (charPool === "") {
        break;
      }

      var randomChar = getRandomCharFrom(charPool);
      password += randomChar;
    }

    passwordInput.value = password;
  }

  // Función para obtener un carácter aleatorio de una cadena de texto
  function getRandomCharFrom(string) {
    var randomIndex = Math.floor(Math.random() * string.length);
    return string.charAt(randomIndex);
  }

  lengthInput.addEventListener("input", generatePassword);
  uppercaseCheckWide.addEventListener("change", generatePassword);
  lowercaseCheckWide.addEventListener("change", generatePassword);
  numbersCheckWide.addEventListener("change", generatePassword);
  symbolsCheckWide.addEventListener("change", generatePassword);

  copyButtonWide.addEventListener("click", function (event) {
    event.preventDefault();
    copyToClipboard();
  });

  function copyToClipboard() {
    const password = passwordInput.value;
    navigator.clipboard
      .writeText(password)
      .then(function () {
        console.log("Contraseña copiada al portapapeles: " + password);
      })
      .catch(function (error) {
        console.error("Error al copiar la contraseña: " + error);
      });
  }

  reloadButtonWide.addEventListener("click", function (event) {
    event.preventDefault();
    generatePassword();
  });
});
