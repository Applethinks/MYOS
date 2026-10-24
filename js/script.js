// MYOS - Make Your Own Site

document.addEventListener("DOMContentLoaded", () => {

        // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });
    }

    // Automatic copyright year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
    // Live webpage builder
    const siteName = document.getElementById("siteName");
    const siteHeading = document.getElementById("siteHeading");
    const siteDescription = document.getElementById("siteDescription");
    const siteButton = document.getElementById("siteButton");

    const previewSiteName = document.getElementById("previewSiteName");
    const previewHeading = document.getElementById("previewHeading");
    const previewDescription = document.getElementById("previewDescription");
    const previewButton = document.getElementById("previewButton");
    const previewEyebrow = document.getElementById("previewEyebrow");
    const livePreview = document.getElementById("livePreview");

    function updatePreview() {
        if (!livePreview) return;

        if (siteName && previewSiteName) {
            previewSiteName.textContent =
                siteName.value.trim() || "My Little Business";
        }

        if (siteHeading && previewHeading) {
            previewHeading.textContent =
                siteHeading.value.trim() ||
                "Something wonderful starts here.";
        }

        if (siteDescription && previewDescription) {
            previewDescription.textContent =
                siteDescription.value.trim() ||
                "Discover what our business has to offer!";
        }

        if (siteButton && previewButton) {
            previewButton.textContent =
                (siteButton.value.trim() || "Get In Touch") + " ↗";
        }
    }

    [siteName, siteHeading, siteDescription, siteButton]
        .filter(Boolean)
        .forEach(input => {
            input.addEventListener("input", updatePreview);
        });

    // Accent color selection
    const colorOptions = document.querySelectorAll(".color-option");

    colorOptions.forEach(option => {
        option.addEventListener("click", () => {
            const color = option.dataset.color;

            if (!color || !livePreview) return;

            livePreview.style.setProperty("--preview-accent", color);

            colorOptions.forEach(button => {
                const selected = button === option;

                button.classList.toggle("active", selected);
                button.setAttribute("aria-pressed", String(selected));
            });
        });
    });

    updatePreview();
    // Reset builder to its original design
    const resetBuilder = document.getElementById("resetBuilder");

    if (resetBuilder) {
        resetBuilder.addEventListener("click", () => {

            // Restore original text
            if (siteName) {
                siteName.value = "My Little Business";
            }

            if (siteHeading) {
                siteHeading.value =
                    "Something wonderful starts here.";
            }

            if (siteDescription) {
                siteDescription.value =
                    "We're a small business with big dreams. Discover what we have to offer!";
            }

            if (siteButton) {
                siteButton.value = "Get In Touch";
            }

            // Restore the original green accent
            const defaultColor = "#8dfc5b";

            if (livePreview) {
                livePreview.style.setProperty(
                    "--preview-accent",
                    defaultColor
                );
            }

            // Update selected color button
            colorOptions.forEach(option => {
                const selected =
                    option.dataset.color === defaultColor;

                option.classList.toggle("active", selected);

                option.setAttribute(
                    "aria-pressed",
                    String(selected)
                );
            });

            // Refresh the preview
            updatePreview();
        });
    }
    // Download the customized website
    const downloadPage = document.getElementById("downloadPage");

    if (downloadPage) {
        downloadPage.addEventListener("click", () => {

            const escapeHTML = text =>
                String(text).replace(/[&<>"']/g, char => ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                })[char]);

            const name =
                siteName?.value.trim() || "My Little Business";

            const heading =
                siteHeading?.value.trim() ||
                "Something wonderful starts here.";

            const description =
                siteDescription?.value.trim() ||
                "Discover what our business has to offer!";

            const buttonText =
                siteButton?.value.trim() || "Get In Touch";

            const selectedColor =
                document.querySelector(".color-option.active");

            const accent = /^#[0-9a-f]{3,8}$/i.test(
                selectedColor?.dataset.color || ""
            )
                ? selectedColor.dataset.color
                : "#8dfc5b";

            const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHTML(name)}</title>
<style>
:root {
    --accent: ${accent};
}
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #101411;
    color: #f4f7f3;
}
header {
    padding: 24px 8%;
    border-bottom: 1px solid #303830;
}
.brand {
    font-size: 22px;
    font-weight: bold;
    color: var(--accent);
}
main {
    min-height: 75vh;
    display: grid;
    place-items: center;
    padding: 60px 24px;
    text-align: center;
}
.content {
    max-width: 700px;
}
h1 {
    font-size: clamp(36px, 7vw, 68px);
    line-height: 1.1;
}
p {
    color: #b7c0b8;
    font-size: 18px;
    line-height: 1.7;
}
.button {
    display: inline-block;
    margin-top: 20px;
    padding: 15px 24px;
    border-radius: 10px;
    background: var(--accent);
    color: #101411;
    text-decoration: none;
    font-weight: bold;
}
footer {
    padding: 24px;
    text-align: center;
    color: #a0aaa1;
}
</style>
</head>
<body>
<header>
    <div class="brand">${escapeHTML(name)}</div>
</header>
<main>
    <section class="content">
        <h1>${escapeHTML(heading)}</h1>
        <p>${escapeHTML(description)}</p>
        <a class="button" href="#contact">${escapeHTML(buttonText)}</a>
    </section>
</main>
<footer id="contact">
    &copy; ${new Date().getFullYear()} ${escapeHTML(name)}
</footer>
</body>
</html>`;

            const blob = new Blob([html], {
                type: "text/html;charset=utf-8"
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "my-website.html";

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    }
    // Prevent accidental form submission
    const builderForm = document.getElementById("builderForm");

    if (builderForm) {
        builderForm.addEventListener("submit", event => {
            event.preventDefault();
            updatePreview();
        });
    }

