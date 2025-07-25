const signUpForm = document.querySelector("#form-signUp");
const nameInput = document.querySelector("#textInput");
const emailInput = document.querySelector("#floatingInput");
const passInput = document.querySelector("#floatingPassword");
const confirmInput = document.querySelector("#Confirm-Password");
const signUpBtn = document.querySelector("#signUpBtn");
const Ptag = document.querySelector("#text");
const eye_icons = document.querySelectorAll(".icon-eye");

async function handleSignUp(e) {
  e.preventDefault();
  clearError();
  // ==========validation form=========
  const name = nameInput.value.trim();
  const namePattern = /^[A-Za-z]{3,30}$/;
  if (!namePattern.test(name)) {
    showError(
      nameInput,
      "Name must be 3 to 30 letters. No numbers or symbols allowed."
    );
    return;
  }

  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError(emailInput, "please enter valid email address.");
    return;
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
    return;
  } else if (pass !== confirmPass) {
    showError(confirmInput, "Passwords do not match!!");
    return;
  }
  // ==========Check if the email already exists in the API==============
  try {
    const { data } = await axios.get(
      "https://68738976c75558e273547c3d.mockapi.io/users_info"
    );
    const emailExist = data.some((user) => user.email === email);
    if (emailExist) {
      showError(emailInput, "This email has already been registered.");
      return;
    }
    signUpBtn.disabled = true;
    // =======Send user data to API=======
    const user = {
      name: name,
      email: email,
      password: pass,
      score: 0,
    };

    await axios.post(
      "https://68738976c75558e273547c3d.mockapi.io/users_info",
      user
    );
    signUpBtn.disabled = false;
    // =========Show success alert using Bootstrap=======
    const divAlert = document.createElement("div");
    divAlert.classList.add(
      "alert",
      "alert-success",
      "mt-3",
      "p-2",
      "fs-6",
      "w-100"
    );
    divAlert.role = "alert";
    divAlert.textContent = "Sign Up successful! Redirecting to sign In.... ";
    signUpForm.reset();
    setTimeout(() => {
      window.location.href = "#";
    }, 2000);
    Ptag.insertAdjacentElement("beforeend", divAlert);
    location.href = "../SignInPage/indexSi.html";

    // =========================================================
  } catch (error) {
    signUpBtn.disabled = false;
    console.error("Error during sign up", error);
    showError(signUpBtn, "Something went wrong. try again.");
    return;
  }
}

// =========Show validation error for input field===========
function showError(input, message) {
  input.classList.add("is-invalid");
  const err = document.createElement("p");
  err.textContent = message;
  err.classList.add("text-danger", "mt-3", "mb-0");
  input.insertAdjacentElement("afterend", err);
}
// ================= Clear all input errors=================
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
// ===================handle icon============
eye_icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.parentElement.querySelector("input");
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);

    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
  });
});
// ==================================================
signUpForm.addEventListener("submit", handleSignUp);
