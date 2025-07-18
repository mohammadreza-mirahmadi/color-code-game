const signUpForm = document.querySelector("#form-signUp");
const nameInput = document.querySelector("#textInput");
const emailInput = document.querySelector("#floatingInput");
const passInput = document.querySelector("#floatingPassword");
const confirmInput = document.querySelector("#Confirm-Password");
const signUpBtn = document.querySelector("#signUpBtn");

function signUp(e) {
  e.preventDefault();
  clearError();
  const name = nameInput.value.trim();
  const namePattern = /^[A-Za-z]{3,30}$/;
  if (!namePattern.test(name)) {
    showError(
      nameInput,
      "Name must be 3 to 30 letters. No numbers or symbols allowed."
    );
  }

  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(emailInput, "please enter valid email address.");
  }

  const pass = passInput.value.trim();
  const confirmPass = confirmInput.value.trim();
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/~`\\|-]).{8,}$/;
  if (!passPattern.test(pass)) {
    showError(
      passInput,
      "Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character."
    );
  } else if (pass !== confirmPass) {
    showError(confirmInput, "Passwords do not match!!");
  }
}

function showError(input, message) {
  input.classList.add("is-invalid");
  const err = document.createElement("p");
  err.textContent = message;
  err.classList.add("text-danger", "mt-3", "mb-0");
  input.insertAdjacentElement("afterend", err);
}

function clearError() {
  const inputs = [nameInput, emailInput, passInput, confirmInput];
  inputs.forEach((input) => {
    input.classList.remove("is-invalid");
    const next = input.nextElementSibling;
    if (next && next.classList.contains("text-danger")) {
      next.remove();
    }
  });
}

signUpForm.addEventListener("submit", signUp);
