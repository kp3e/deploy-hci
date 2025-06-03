document.addEventListener("DOMContentLoaded", function () {
  initializeSearchFilter();
});

function initializeSearchFilter() {
  // Get DOM elements
  const filterBtn = document.getElementById("filterBtn");
  const filterPopup = document.getElementById("filterPopup");
  const overlay = document.getElementById("overlay");
  const applyBtn = document.getElementById("applyBtn");
  const filterTags = document.querySelectorAll(".filter-tag");
  const requirementTags = document.querySelectorAll(".requirement-tag");
  const ageInputs = document.querySelectorAll(".age-input");
  const locationInput = document.querySelector(".location-input");

  let isPopupOpen = false;

  // Check if elements exist before adding listeners
  if (!filterBtn || !filterPopup || !overlay || !applyBtn) {
    console.error("Required elements not found");
    return;
  }

  // Toggle filter popup
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    togglePopup();
  });

  // Close popup when clicking overlay
  overlay.addEventListener("click", function () {
    closePopup();
  });

  // Close popup when clicking outside
  document.addEventListener("click", function (e) {
    if (!filterPopup.contains(e.target) && !filterBtn.contains(e.target)) {
      closePopup();
    }
  });

  // Category filter selection
  filterTags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      filterTags.forEach(function (t) {
        t.classList.remove("selected");
      });
      tag.classList.add("selected");
    });
  });

  // Requirement filter selection
  requirementTags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      const group = tag.closest(".requirement-group");
      const siblings = group.querySelectorAll(".requirement-tag");
      siblings.forEach(function (sibling) {
        sibling.classList.remove("selected");
      });
      tag.classList.add("selected");
    });
  });

  // Apply filters
  applyBtn.addEventListener("click", function () {
    const selectedKategori = document.querySelector(".filter-tag.selected");
    const selectedGender = document.querySelector(".requirement-tag.selected");

    const selectedFilters = {
      kategori: selectedKategori ? selectedKategori.dataset.kategori : null,
      lokasi: locationInput ? locationInput.value : null,
      gender: selectedGender ? selectedGender.dataset.gender : null,
      ageMin: ageInputs[0] ? ageInputs[0].value : null,
      ageMax: ageInputs[1] ? ageInputs[1].value : null,
    };

    console.log("Applied filters:", selectedFilters);

    // Trigger custom event for external handling
    const filterEvent = new CustomEvent("filtersApplied", {
      detail: selectedFilters,
    });
    document.dispatchEvent(filterEvent);

    closePopup();
  });

  // Prevent popup from closing when clicking inside it
  filterPopup.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Public functions for external access
  window.SearchFilter = {
    togglePopup: togglePopup,
    openPopup: openPopup,
    closePopup: closePopup,
    resetSection: resetSection,
    getSelectedFilters: getSelectedFilters,
  };

  function togglePopup() {
    if (isPopupOpen) {
      closePopup();
    } else {
      openPopup();
    }
  }

  function openPopup() {
    isPopupOpen = true;
    filterPopup.classList.add("show");
    overlay.classList.add("show");

    // Trigger custom event
    const openEvent = new CustomEvent("filterPopupOpened");
    document.dispatchEvent(openEvent);
  }

  function closePopup() {
    isPopupOpen = false;
    filterPopup.classList.remove("show");
    overlay.classList.remove("show");

    // Trigger custom event
    const closeEvent = new CustomEvent("filterPopupClosed");
    document.dispatchEvent(closeEvent);
  }

  function resetSection(section) {
    if (section === "kategori") {
      filterTags.forEach(function (tag) {
        tag.classList.remove("selected");
      });
      if (filterTags[0]) {
        filterTags[0].classList.add("selected"); // Select first one (Lingkungan)
      }
    } else if (section === "lokasi") {
      if (locationInput) {
        locationInput.value = "";
      }
    } else if (section === "persyaratan") {
      requirementTags.forEach(function (tag) {
        tag.classList.remove("selected");
      });
      ageInputs.forEach(function (input) {
        if (input) input.value = "";
      });
    }
  }

  function getSelectedFilters() {
    const selectedKategori = document.querySelector(".filter-tag.selected");
    const selectedGender = document.querySelector(".requirement-tag.selected");

    return {
      kategori: selectedKategori ? selectedKategori.dataset.kategori : null,
      lokasi: locationInput ? locationInput.value : null,
      gender: selectedGender ? selectedGender.dataset.gender : null,
      ageMin: ageInputs[0] ? ageInputs[0].value : null,
      ageMax: ageInputs[1] ? ageInputs[1].value : null,
    };
  }
}

// Global reset function for onclick attributes
function resetSection(section) {
  if (window.SearchFilter && window.SearchFilter.resetSection) {
    window.SearchFilter.resetSection(section);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Add click tracking for buttons
  document.querySelector(".btn-chat").addEventListener("click", function (e) {
    console.log("Navigating to chat...");
  });

  document
    .querySelector(".btn-register")
    .addEventListener("click", function (e) {
      console.log("Navigating to registration...");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function initTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", handleTabClick);
    });
  }

  function handleTabClick() {
    tabs.forEach((t) => t.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    this.classList.add("active");

    const targetPanel = document.getElementById(this.dataset.tab);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  }

  function initActivityButtons() {
    const activityButtons = document.querySelectorAll(".activity-button");
    activityButtons.forEach((button) => {
      button.addEventListener("click", handleActivityButtonClick);
    });
  }

  function handleActivityButtonClick(e) {
    e.preventDefault();
    const buttonText = this.textContent.trim();

    if (buttonText === "Lihat Detail") {
      window.location.href = "program-registered.html";
    } else {
      const activityTitle =
        this.parentElement.querySelector(".activity-title").textContent;
      alert(`Navigating to: ${activityTitle}`);
    }
  }

  function initSeeAllButton() {
    const seeAllButton = document.querySelector(".see-all");
    if (seeAllButton) {
      seeAllButton.addEventListener("click", handleSeeAllClick);
    }
  }

  function handleSeeAllClick() {
    alert("Showing all activities...");
  }

  function initProfileImage() {
    const profileImg = document.querySelector(".profile-image img");
    if (profileImg) {
      profileImg.addEventListener("error", function () {
        this.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23e0e0e0'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%23999'/%3E%3Cellipse cx='60' cy='85' rx='25' ry='15' fill='%23999'/%3E%3C/svg%3E";
      });
    }
  }

  function init() {
    initTabs();
    initActivityButtons();
    initSeeAllButton();
    initProfileImage();

    console.log("Profile interface initialized successfully");
  }

  init();

  window.ProfileInterface = {
    switchTab: function (tabName) {
      const tab = document.querySelector(`[data-tab="${tabName}"]`);
      if (tab) {
        tab.click();
      }
    },

    addActivity: function (activityData) {
      const activeTab = document.querySelector(".tab-panel.active");
      if (activeTab && activityData) {
        const activityHtml = createActivityHTML(activityData);
        activeTab.insertAdjacentHTML("beforeend", activityHtml);

        initActivityButtons();
      }
    },
  };
});
