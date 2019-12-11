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
const Project = function (name) {
    const thumbnail = document.querySelector(`[type=thumbnail][project=${name}]`);
    const slide = document.querySelector(`[type=slide][project=${name}]`);
    const collapseButton = document.querySelector(`[type=slide][project=${name}] [type=collapse]`);
    const init = () => {
        if (thumbnail) {
            thumbnail.addEventListener("mouseenter", e => {
                if (slide) {
                    const collapsedSlide = document.querySelector(".collapsed");
                    if (collapsedSlide)
                        collapsedSlide.classList.remove("collapsed");
                    state.select(slide, thumbnail);
                }
            });
        }
        if (collapseButton) {
            collapseButton.addEventListener("click", e => {
                if (slide) {
                    const container = slide.querySelector("[type=container]");
                    if (container)
                        container.classList.add("collapsed");
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
    selected: { slide: projects[0].slide, thumbnail: projects[0].thumbnail },
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
// Set up Selectors
const thumbnails = document.querySelector("[type=thumbnailList]");
const slides = document.querySelectorAll("[type=slide]");
// Helpers
const nameIsValid = (name) => name && Object.values(ProjectNames).includes(name);
// Handle image resize events
window.addEventListener("resize", () => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    console.log("page", pageWidth, pageHeight);
    const image = document.querySelector("img[type=desktop]");
    // height = 850, width = 1900
    if (image) {
        const imageWidth = image.offsetWidth;
        const imageHeight = image.offsetHeight;
        console.log("image", imageWidth, imageHeight);
        console.log("difference", pageWidth / imageWidth);
    }
});
