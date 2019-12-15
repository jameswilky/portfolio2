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
    if (mobileImage && name !== "chess") {
      const showImage = (i: number) => {
        if (images) {
          images.forEach((image, j) => {
            if (i === j) image.classList.add("show");
            else image.classList.remove("show");
          });
        }
      };
      let nextImage = 0;
      const n = 1;
      showImage(nextImage);

      return setInterval(() => {
        if (nextImage < n) ++nextImage;
        else nextImage = 0;
        showImage(nextImage);
      }, 5000);
    }
  };
  const cleanUpText = (slide: HTMLElement) => {
    const collapsedItem: HTMLElement | null = document.querySelector(
      ".collapsed"
    );

    // Used for cleaning up text transition
    if (
      collapsedItem &&
      collapsedItem.getAttribute("project") === slide.getAttribute("project")
    ) {
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
          const desktopImage: HTMLImageElement | null = slide.querySelector(
            "img[type=desktop]"
          );
          if (desktopImage) {
            desktopImage.classList.toggle("show");
            console.log(desktopImage);
          }
          setTimeout(() => {
            slide.classList.add("collapsed");
          }, 500);
          setTimeout(() => {
            startCarousel();
          }, 1000);
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
  selected: { slide: null, thumbnail: null },
  select: function(slide: HTMLElement | null, thumbnail: HTMLElement | null) {
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
  const body: HTMLElement | null = document.querySelector("body");
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
