// Types
enum ProjectNames {
  Airplayer = "airplayer",
  Mosaicify = "mosaicify",
  Notflix = "notflix",
  Gitview = "gitview",
  Ascension = "ascension",
  Chess = "chess"
}

// State
interface State {
  selected: { slide: HTMLElement | null; thumbnail: HTMLElement | null };
  select: (slide: HTMLElement | null, thumbnail: HTMLElement | null) => void;
}

// Project
interface IProject {
  name: string;
  slide: HTMLElement | null;
  thumbnail: HTMLElement | null;
  collapseButton: HTMLButtonElement | null;
}

//Add Sidebar scroll events for mobile
const sidebar: HTMLElement | null = document.querySelector("[type=sidebar]");
if (sidebar) {
  const menuOpenButton: HTMLElement | null = document.querySelector(
    "[type=hamburger]"
  );
  if (menuOpenButton) {
    menuOpenButton.addEventListener("click", e => {
      console.log(sidebar);
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

  const mobileImage: HTMLImageElement | null =
    slide && slide.querySelector("[type=mobile]");
  const images: NodeListOf<HTMLImageElement> | null =
    slide && slide.querySelectorAll("[type=mobile]");

  const startCarousel = () => {
    if (mobileImage && images) {
      const showImage = (i: number) => {
        images.forEach((image, j) => {
          if (i === j) image.classList.add("show");
          else image.classList.remove("show");
        });
      };
      let nextImage = 0;
      const n = images.length - 1;
      showImage(nextImage);

      return setInterval(() => {
        if (nextImage < n) ++nextImage;
        else nextImage = 0;
        showImage(nextImage);
      }, 4000);
    }
  };

  const init = () => {
    if (thumbnail) {
      thumbnail.addEventListener("click", e => {
        if (slide) {
          // Remove collapsed class from all slides
          const slides: NodeListOf<Element> = document.querySelectorAll(
            "[type=slide]"
          );
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
        }
      });
    }

    startCarousel();
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
  selected: { slide: null, thumbnail: null },
  select: function(slide: HTMLElement | null, thumbnail: HTMLElement | null) {
    if (this.selected.slide && this.selected.thumbnail) {
      this.selected.slide.classList.toggle("show");

      this.selected.thumbnail.classList.remove("show");
      this.selected.thumbnail.classList.add("hide");
    }
    this.selected.slide = slide;
    this.selected.thumbnail = thumbnail;
    if (this.selected.slide && this.selected.thumbnail) {
      this.selected.slide.classList.toggle("show");

      this.selected.thumbnail.classList.remove("hide");
      this.selected.thumbnail.classList.add("show");
    }
  }
};

if (projects[0]) {
  state.select(projects[0].slide, projects[0].thumbnail);
}

// View projects button

const button: HTMLElement | null = document.querySelector("[type=view]");
const body: HTMLElement | null = document.querySelector("body");
if (button && body)
  button.addEventListener("click", () => {
    body.classList.add("showLanding");
  });
