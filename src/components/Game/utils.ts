import chalkSvg from "../../assets/svg/chalk.svg";
import { playShortChalkSound } from "../../stores/soundStore";


const createGreenCover = (relativeElement: HTMLDivElement, transitionDuration: number) => {
    const greenDuration = transitionDuration * 1.5;
    const greenCover = window.document.createElement("span");
    greenCover.className = "bg-emerald-600 top-0 left-0 absolute w-full h-full transition-all";
    greenCover.style.transition = `left ${greenDuration}ms ease-in-out`;
    relativeElement.appendChild(greenCover);
    return greenCover;
}

const createChalkElement = (containerElement: HTMLDivElement, relativeElement: HTMLDivElement, transitionDuration: number) => {
    window.document.querySelectorAll(".chalk").forEach(chalk => chalk.remove());
    const chalkElement = window.document.createElement("img");
    const rect = relativeElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    chalkElement.src = chalkSvg;
    chalkElement.className = "chalk absolute top-0 left-0 z-10 transition-all w-20 opacity-0";
    chalkElement.style.transition = `left ${transitionDuration}ms ease-in-out, opacity 200ms ease-in-out`;
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    chalkElement.style.left = `${left}px`;
    chalkElement.style.top = `${top}px`;
    setTimeout(() => {
        chalkElement.style.opacity = "1";
    }, 200);
    containerElement.appendChild(chalkElement);
    return chalkElement;
}


export function moveChalk(containerElement: HTMLDivElement, relativeElement: HTMLDivElement, duration: number) {
    const greenDuration = duration * 1.5;

    if (!containerElement || !relativeElement) return;

    const greenCover = createGreenCover(relativeElement, duration);
    const chalkElement = createChalkElement(containerElement, relativeElement, duration);

    const rect = relativeElement.getBoundingClientRect();
    const containerRect = containerElement.getBoundingClientRect();
    const relativeElementEndHorizontalPosition = rect.right - chalkElement.clientWidth / 2 - containerRect.left;

    chalkElement.style.transition = `left ${duration}ms ease-in-out, opacity 200ms ease-in-out`;
    chalkElement.style.opacity = "1";


    setTimeout(() => {
        chalkElement.style.left = `${relativeElementEndHorizontalPosition}px`;

        greenCover.style.left = `${relativeElementEndHorizontalPosition}px`;
        greenCover.style.transition = `left ${greenDuration}ms ease-in-out`;
        playShortChalkSound();

        setTimeout(() => {
            chalkElement.style.opacity = "0";
        }, duration);
    }, duration);
}


export function draw({duration, elementToDraw, container, wait, disappear=500}: {duration: number, elementToDraw: HTMLDivElement, container: HTMLDivElement, wait: number, disappear: number}) {
    if (!elementToDraw || !container) return;

    elementToDraw.style.transition = `opacity ${disappear}ms ease-in-out`;
    elementToDraw.style.opacity = "1";
    elementToDraw.style.display = "block";

    moveChalk(container, elementToDraw, duration);

    setTimeout(() => {
        elementToDraw.style.opacity = "0";
        setTimeout(() => {
            elementToDraw.style.display = "none";
        }, disappear);
    }, duration*2);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, wait);
    });
}