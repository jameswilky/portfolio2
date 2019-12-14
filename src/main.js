"use strict";
// Types
var ProjectNames;
(function (ProjectNames) {
    ProjectNames["Airplayer"] = "airplayer";
    ProjectNames["Mosaicify"] = "mosaicify";
    ProjectNames["Notflix"] = "notflix";
    ProjectNames["Ascension"] = "ascension";
    ProjectNames["Gitview"] = "gitview";
    ProjectNames["Chess"] = "chess";
})(ProjectNames || (ProjectNames = {}));
//Add Sidebar scroll events for mobile
const sidebar = document.querySelector("[type=sidebar]");
if (sidebar) {
    const menuOpenButton = document.querySelector("[type=hamburger]");
    if (menuOpenButton) {
        menuOpenButton.addEventListener("click", e => {
            sidebar.classList.add("show");
        });
    }
    const menuCloseButton = document.querySelector("[type=close]");
    if (menuCloseButton) {
        menuCloseButton.addEventListener("click", e => {
            sidebar.classList.remove("show");
        });
    }
}
const Project = function (name) {
    const thumbnail = document.querySelector(`[type=thumbnail][project=${name}]`);
    const slide = document.querySelector(`[type=slide][project=${name}]`);
    const collapseButton = document.querySelector(`[type=slide][project=${name}] [type=collapse]`);
    const mobileImage = slide && slide.querySelector("[type=mobile]");
    const images = slide && slide.querySelectorAll("[type=mobile]");
    const startCarousel = () => {
        if (mobileImage && name !== "chess") {
            const showImage = (i) => {
                if (images) {
                    images.forEach((image, j) => {
                        if (i === j)
                            image.classList.add("show");
                        else
                            image.classList.remove("show");
                    });
                }
            };
            let nextImage = 0;
            const n = 1;
            showImage(nextImage);
            return setInterval(() => {
                if (nextImage < n)
                    ++nextImage;
                else
                    nextImage = 0;
                showImage(nextImage);
            }, 5000);
        }
    };
    const cleanUpText = (slide) => {
        const collapsedItem = document.querySelector(".collapsed");
        // Used for cleaning up text transition
        if (collapsedItem &&
            collapsedItem.getAttribute("project") === slide.getAttribute("project")) {
            slide.classList.add("animationCleanUp");
        }
        setTimeout(() => {
            slide.classList.remove("animationCleanUp");
        }, 2000);
    };
    const init = () => {
        if (thumbnail) {
            thumbnail.addEventListener("click", e => {
                if (slide) {
                    // Check if we are hovering over collapsed slide
                    cleanUpText(slide);
                    // Remove collapsed class from all slides
                    const slides = document.querySelectorAll("[type=slide]");
                    slides.forEach(slide => slide.classList.remove("collapsed"));
                    // If sidebar is open on mobile, close it
                    if (sidebar) {
                        sidebar.classList.remove("show");
                    }
                    // Select hovered slide
                    state.select(slide, thumbnail);
                }
            });
        }
        if (collapseButton) {
            collapseButton.addEventListener("click", e => {
                if (slide) {
                    slide.classList.add("collapsed");
                    setTimeout(() => {
                        startCarousel();
                    }, 500);
                }
            });
        }
    };
    init();
    return {
        name,
        slide,
        thumbnail,
        collapseButton
    };
};
// Initialize projects
const projects = Object
    .values(ProjectNames)
    .map((name) => Project(name));
// Initialize state
const state = {
    selected: { slide: null, thumbnail: null },
    select: function (slide, thumbnail) {
        if (this.selected.slide && this.selected.thumbnail) {
            this.selected.slide.classList.remove("show");
            this.selected.slide.classList.add("hide");
            this.selected.thumbnail.classList.remove("show");
            this.selected.thumbnail.classList.add("hide");
        }
        this.selected.slide = slide;
        this.selected.thumbnail = thumbnail;
        if (this.selected.slide && this.selected.thumbnail) {
            this.selected.slide.classList.remove("hide");
            this.selected.slide.classList.add("show");
            this.selected.thumbnail.classList.remove("hide");
            this.selected.thumbnail.classList.add("show");
        }
    }
};
// Hide all when resizing
window.addEventListener("resize", () => {
    const body = document.querySelector("body");
    if (body) {
        body.classList.add("hide");
        setTimeout(() => {
            body.classList.remove("hide");
        }, 500);
    }
});
if (projects[0]) {
    state.select(projects[0].slide, projects[0].thumbnail);
}
// TODO remove slider timer after uncollapse
