// Types
enum ProjectNames {
  Airplayer = "airplayer",
  Mosaicify = "mosaicify",
  Notflix = "notflix",
  Ascension = "ascension",
  Gitview = "gitview",
  Chess = "chess"
}

// State
interface State {
  selected: { slide: HTMLElement | null; thumbnail: HTMLElement | null };
  select: (slide: HTMLElement, thumbnail: HTMLElement) => void;
}

// Project
interface IProject {
  name: string;
  slide: HTMLElement | null;
  thumbnail: HTMLElement | null;
  collapseButton: HTMLButtonElement | null;
}

const Project = function(name: string): IProject {
  const thumbnail: HTMLElement | null = document.querySelector(
    `[type=thumbnail][project=${name}]`
  );
  const slide: HTMLElement | null = document.querySelector(
    `[type=slide][project=${name}]`
  );
  const collapseButton: HTMLButtonElement | null = document.querySelector(
    `[type=slide][project=${name}] [type=collapse]`
  );

  const init = () => {
    if (thumbnail) {
      thumbnail.addEventListener("mouseenter", e => {
        if (slide) {
          const collapsedSlide = document.querySelector(".collapsed");
          if (collapsedSlide) collapsedSlide.classList.remove("collapsed");
          state.select(slide, thumbnail);
        }
      });
    }

    if (collapseButton) {
      collapseButton.addEventListener("click", e => {
        if (slide) {
          const container = slide.querySelector("[type=container]");
          if (container) container.classList.add("collapsed");
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
const projects: Array<IProject> = (<any>Object)
  .values(ProjectNames)
  .map((name: string) => Project(name));

// Initialize state
const state: State = {
  selected: { slide: projects[0].slide, thumbnail: projects[0].thumbnail },
  select: function(slide: HTMLElement, thumbnail: HTMLElement) {
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
const thumbnails: HTMLElement | null = document.querySelector(
  "[type=thumbnailList]"
);
const slides: NodeListOf<HTMLElement> = document.querySelectorAll(
  "[type=slide]"
);

// Helpers
const nameIsValid = (name: string | null) =>
  name && (<any>Object).values(ProjectNames).includes(name);

// Handle image resize events

window.addEventListener("resize", () => {
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;
  console.log("page", pageWidth, pageHeight);
  const image: HTMLElement | null = document.querySelector("img[type=desktop]");

  // height = 850, width = 1900
  if (image) {
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;
    console.log("image", imageWidth, imageHeight);

    console.log("difference", pageWidth / imageWidth);
  }
});
