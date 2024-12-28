const BASE_URL = "http://localhost:3001/api/";

// Fetch available slots when the date is changed
document
  .getElementById("date-picker")
  .addEventListener("change", fetchAvailableSlots);

function fetchAvailableSlots() {
  const date = document.getElementById("date-picker").value;
  if(!date) return
  fetch(`${BASE_URL}slots/${date}`)
    .then((response) => response.json())
    .then((slots) => {
      const slotContainer = document.getElementById("available-slots");
      slotContainer.innerHTML = ""; // Clear previous slots

      if (slots.length === 0) {
        slotContainer.innerHTML = "<p>No available slots</p>";
      } else {
        slots.forEach((slot) => {
          const button = document.createElement("button");
          button.innerText = slot;
          button.classList.add("slot-button");
          button.onclick = () => {
            document
              .querySelectorAll("#available-slots .slot-button")
              .forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            showBookingForm(slot);
          };
          slotContainer.appendChild(button);
        });
      }
    });
}

function showBookingForm(slot) {
  const formSection = document.getElementById("form-section");
  formSection.classList.remove("hidden");

  const slotInput = document.createElement("input");
  slotInput.type = "hidden";
  slotInput.id = "slot";
  slotInput.value = slot;
  formSection.appendChild(slotInput);
}

function bookAppointment(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const activeButton = document.querySelector("button.active");
  let valid = true;

  const nameError = document.getElementById("name-error");
  if (!name) {
    nameError.textContent = "Name is required.";
    valid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.textContent = "Name must contain only letters and spaces.";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  const phoneError = document.getElementById("phone-error");
  if (!phone) {
    phoneError.textContent = "Phone number is required.";
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    phoneError.textContent = "Phone number must be a valid 10-digit number.";
    valid = false;
  } else {
    phoneError.textContent = "";
  }

  if (!activeButton) {
    alert("Please select a time slot.");
    valid = false;
  }

  if (!valid) return;

  const date = document.getElementById("date-picker").value;
  const timeSlot = activeButton.innerText;

  const data = {name, phone, date, timeSlot}

  fetch(`${BASE_URL}book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        resetForm();
      } else {
        alert(data.error);
      }
    });
}

function resetForm() {
  const formSection = document.getElementById("form-section");
  formSection.classList.add("hidden");

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";

  document.querySelectorAll("#available-slots .slot-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  const slotInput = document.getElementById("slot");
  if (slotInput) {
    slotInput.remove();
  }
}
