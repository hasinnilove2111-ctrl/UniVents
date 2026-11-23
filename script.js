let errors = [];
let errorIds = [];

function showMessage(boxId, afterElement, message, top) {
  let box = document.getElementById(boxId);
  if (box === null) {
    box = document.createElement("span");
    box.id = boxId;
    box.style.display = "block";
    box.style.color = "red";
    box.style.fontSize = "14px";
    box.style.marginTop = top;
    box.style.marginBottom = "14px";
    afterElement.parentNode.insertBefore(box, afterElement.nextSibling);
  }
  box.innerHTML = message;
  errors.push(message);
  errorIds.push(boxId);
}

function showError(id, message) {
  document.getElementById(id).style.borderColor = "red";
  showMessage("err_" + id, document.getElementById(id), message, "-14px");
}

function clearErrors() {
  for (let i = 0; i < errorIds.length; i++) {
    document.getElementById(errorIds[i]).innerHTML = "";
    const field = document.getElementById(errorIds[i].slice(4));
    if (field !== null) field.style.borderColor = "";
  }
  errors = [];
  errorIds = [];
}

function getValue(id) {
  return document.getElementById(id).value;
}

function isDigits(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] < "0" || text[i] > "9") return false;
  }
  return text.length > 0;
}

function isValidName(name) {
  for (let i = 0; i < name.length; i++) {
    const c = name[i].toLowerCase();
    if ((c < "a" || c > "z") && c !== " " && c !== "." && c !== "-") return false;
  }
  return name.length >= 3;
}

function isValidEmail(email) {
  const at = email.indexOf("@");
  const domain = email.slice(at + 1);
  return at > 0 && domain.indexOf(".") > 0 && domain[domain.length - 1] !== "." && email.indexOf(" ") === -1;
}

function isValidStudentId(id) {
  return id.length === 10 && id[2] === "-" && id[8] === "-" &&
         isDigits(id.slice(0, 2)) && isDigits(id.slice(3, 8)) && isDigits(id.slice(9));
}

function isValidEmployeeId(id) {
  const number = id.slice(4);
  return id.slice(0, 4) === "EMP-" && number.length >= 3 && number.length <= 6 && isDigits(number);
}

function isValidPhone(phone) {
  return phone.length === 11 && phone.slice(0, 2) === "01" && isDigits(phone);
}

function isStrongPassword(pass) {
  let upper = false; let lower = false; let digit = false;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] >= "A" && pass[i] <= "Z") upper = true;
    else if (pass[i] >= "a" && pass[i] <= "z") lower = true;
    else if (pass[i] >= "0" && pass[i] <= "9") digit = true;
  }
  return pass.length >= 8 && upper && lower && digit;
}

function getAge(dob) {
  return new Date().getFullYear() - new Date(dob).getFullYear();
}

function checkField(id, emptyMsg, ok, badMsg) {
  if (getValue(id) === "") showError(id, emptyMsg);
  else if (!ok) showError(id, badMsg);
}

function checkRole() {
  if (!document.getElementById("student").checked && !document.getElementById("organizer").checked) {
    showMessage("err_role", document.querySelector('label[for="organizer"]'), "Please select a role.", "-14px");
  }
}

function checkTerms() {
  if (!document.getElementById("Condition").checked) {
    showMessage("err_terms", document.querySelector(".terms-row"), "You must agree to the Terms and Condition.", "0px");
  }
}

function checkName() {
  checkField("fullname", "Full name is required.", isValidName(getValue("fullname")), "Name must have only letters (min 3 characters).");
}

function checkEmail() {
  checkField("email", "Email is required.", isValidEmail(getValue("email")), "Enter a valid email address.");
}

function checkPassword() {
  checkField("password", "Password is required.", isStrongPassword(getValue("password")), "Min 8 characters with uppercase, lowercase and a number.");
}

let wrongCount = 0;
const MAX_WRONG = 3;

function startLock() {
  const btn = document.getElementById("submit");
  btn.disabled = true;

  let msg = document.getElementById("lockMsg");
  if (msg === null) {
    msg = document.createElement("span");
    msg.id = "lockMsg";
    msg.style.display = "block";
    msg.style.color = "red";
    msg.style.fontSize = "14px";
    msg.style.marginTop = "10px";
    msg.style.textAlign = "center";
    btn.parentNode.insertBefore(msg, btn.nextSibling);
  }

  let seconds = 30;
  msg.innerHTML = "Too many wrong attempts. Try again in " + seconds + " seconds.";

  const timer = setInterval(function () {
    seconds--;
    if (seconds > 0) {
      msg.innerHTML = "Too many wrong attempts. Try again in " + seconds + " seconds.";
    } else {
      clearInterval(timer);
      msg.innerHTML = "";
      btn.disabled = false;
      wrongCount = 0;
    }
  }, 1000);
}


function validateSignup() {
    clearErrors();

    checkRole();
    checkName();

    checkField("studentid", "ID is required.", isValidStudentId(getValue("studentid")), "ID format must be like 23-12345-1.");

    if (getValue("dept") === "") {
        showError("dept", "Please select a department.");
    }

    if (getValue("semester") === "") {
        showError("semester", "Please select a semester.");
    }

    checkField("dob", "Date of birth is required.", getAge(getValue("dob")) >= 18, "You must be at least 18 years old.");

    checkEmail();
    checkPassword();

    checkField("Conpassword", "Please confirm your password.", getValue("password") === getValue("Conpassword"), "Passwords do not match.");

    checkTerms();

    console.log("Signup errors:", errors);

    if (errors.length > 0) {
        wrongCount++;

        if (wrongCount >= MAX_WRONG) {
            startLock();
        }

        return false;
    }

    alert("Registration Successful!");

    document.querySelector("form").reset();

    return false;
}


function validateLogin() {
  clearErrors();
  checkRole();
  checkEmail();
  if (getValue("password") === "") showError("password", "Password is required.");
  console.log("Login errors:", errors);
  return errors.length === 0;
}

function validateForgot() {
  clearErrors();
  checkEmail();
  checkPassword();
  checkField("Conpassword", "Please confirm your password.", getValue("password") === getValue("Conpassword"), "Passwords do not match.");
  console.log("Forgot password errors:", errors);
  if (errors.length === 0) {
    alert("Your password has been changed successfully.");
    window.location.href = "login.html";
    return false;
  }
  return false;
}

function validateAdmin() {
  clearErrors();
  checkName();
  checkField("employeeid", "Employee ID is required.", isValidEmployeeId(getValue("employeeid")), "Employee ID must be like EMP-1024.");
  if (getValue("designation") === "") showError("designation", "Please select a designation.");
  if (getValue("office") === "") showError("office", "Please select an office.");
  checkField("phone", "Phone number is required.", isValidPhone(getValue("phone")), "Phone must be 11 digits and start with 01.");
  checkField("joindate", "Date of joining is required.", new Date(getValue("joindate")) <= new Date(), "Joining date cannot be in the future.");
  if (getValue("admincode").length < 6) showError("admincode", "Admin access code must be at least 6 characters.");
  checkEmail();
  checkPassword();
  checkTerms();
  console.log("Admin errors:", errors);
  return errors.length === 0;
}

function togglePassword() {
  const type = document.getElementById("showPass").checked ? "text" : "password";
  document.getElementById("password").type = type;
  if (document.getElementById("Conpassword") !== null) document.getElementById("Conpassword").type = type;
}

function addShowPassword() {
  const pass = document.getElementById("password");
  if (pass === null) return;
  const wrap = document.createElement("p");
  wrap.style.marginTop = "-8px";
  wrap.style.marginBottom = "16px";
  wrap.innerHTML = '<input type="checkbox" id="showPass"><label for="showPass"> Show password</label>';
  const con = document.getElementById("Conpassword");
  const last = con !== null ? con : pass;
  last.parentNode.insertBefore(wrap, last.nextSibling);
  document.getElementById("showPass").addEventListener("click", togglePassword);
}

function showStrength() {
  const msg = document.getElementById("strengthMsg");
  const value = getValue("password");
  if (value === "") {
    msg.innerHTML = "";
  } else if (isStrongPassword(value)) {
    msg.innerHTML = "Strong password";
    msg.style.color = "green";
  } else if (value.length >= 6) {
    msg.innerHTML = "Medium: add uppercase, lowercase and a number";
    msg.style.color = "orange";
  } else {
    msg.innerHTML = "Weak password";
    msg.style.color = "red";
  }
}

function addStrengthMessage() {
  const pass = document.getElementById("password");
  if (pass === null || document.getElementById("Conpassword") === null) return;
  const msg = document.createElement("span");
  msg.id = "strengthMsg";
  msg.style.display = "block";
  msg.style.marginTop = "-14px";
  msg.style.marginBottom = "14px";
  msg.style.fontSize = "14px";
  pass.parentNode.insertBefore(msg, pass.nextSibling);
  pass.addEventListener("keyup", showStrength);
}

function changeIdLabel() {
  const organizer = document.getElementById("organizer").checked;
  document.querySelector('label[for="studentid"]').innerHTML = organizer ? "Organizer ID (University ID)" : "Student ID";
}

function addRoleLabelChange() {
  if (document.querySelector('label[for="studentid"]') === null) return;
  document.getElementById("student").addEventListener("change", changeIdLabel);
  document.getElementById("organizer").addEventListener("change", changeIdLabel);
}

function clearOne(id) {
  document.getElementById(id).style.borderColor = "";
  const box = document.getElementById("err_" + id);
  if (box !== null) box.innerHTML = "";
}

function addClearOnType() {
  const ids = ["fullname", "studentid", "dept", "semester", "dob", "email", "password",
               "Conpassword", "employeeid", "designation", "office", "phone", "joindate", "admincode"];
  for (let i = 0; i < ids.length; i++) {
    const field = document.getElementById(ids[i]);
    if (field !== null) {
      field.addEventListener("keyup", function () {
        clearOne(ids[i]);
      });
    }
  }
}

addShowPassword();
addStrengthMessage();
addRoleLabelChange();
addClearOnType();