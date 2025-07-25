document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loadingMessage = document.getElementById("loading-message");
    const messageText = document.getElementById("message-text");

    if (!email || !password) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    try {
      loadingMessage.style.display = "block";
      messageText.innerText = "در حال بررسی اطلاعات...";
      const response = await fetch(
        "https://68738976c75558e273547c3d.mockapi.io/users_info"
      );
      const users = await response.json();
      const user = users.find((u) => u.email === email);

      if (!user) {
        messageText.innerText = "ایمیل یافت نشد. لطفاً ابتدا ثبت‌ نام کنید.";
        loadingMessage.classList.remove("text-primary");
        loadingMessage.classList.add("text-danger");
        return;
      }

      if (user.password !== password) {
        messageText.innerText = "رمز عبور اشتباه است.";
        loadingMessage.classList.remove("text-primary");
        loadingMessage.classList.add("text-danger");
        return;
      }

      messageText.innerText = "ورود موفق! در حال انتقال به صفحه اصلی...";
      loadingMessage.classList.remove("text-danger");
      loadingMessage.classList.add("text-success");
      setTimeout(() => {
        localStorage.setItem("userId", user.id);
        location.href = "../Home-page/Home.html";
      }, 2000);
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      alert("مشکلی در ارتباط با سرور پیش آمده.");
      loadingMessage.style.display = "none";
    }
  });
