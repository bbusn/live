import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
export type ProjectType = {
    id: string;
    name: string;
    type: string;
    description: string;
    images?: string[];
}


const Project = (project: ProjectType) => {
    const { assets, click } = useAuth();
    const modalContainerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const openModal = () => {
        click();
        if (modalContainerRef.current) {
            modalContainerRef.current.classList.toggle("hidden");
            modalContainerRef.current.classList.toggle("flex");
            setTimeout(() => {
                modalContainerRef.current?.classList.toggle("opacity-100");
                modalRef.current?.classList.toggle("scale-0");
                if (assets?.sounds.modal) assets.sounds.modal.play();
            }, 250);
        }
        window.addEventListener("keydown", escapeModal);
    }

    const escapeModal = (e: KeyboardEvent) => {
        if (e.key === "Escape" && modalContainerRef.current?.classList.contains("flex")) {
            closeModal();
        }
    }

    const closeModal = () => {
        click();
        if (modalContainerRef.current) {
            modalContainerRef.current.classList.toggle("opacity-100");
            modalRef.current?.classList.toggle("scale-0");
            setTimeout(() => {
                modalContainerRef.current?.classList.toggle("hidden");
                modalContainerRef.current?.classList.toggle("flex");
            }, 300);
        }
        window.removeEventListener("keydown", escapeModal);
    }

    const toggleModal = () => {
        if (modalContainerRef.current?.classList.contains("hidden")) {
            openModal();
        } else {
            closeModal();
        }
    }

    return (
        <>
            <div onClick={() => {
                toggleModal();
            }} className="transitions outline outline-transparent hover:outline-secondary-400 hover:saturate-100 lg:saturate-0 cursor-pointer active:scale-90 flex flex-col items-center justify-center bg-primary-300 p-1.5 h-max w-max">
                <img src={assets?.images[project.id].src} className="w-36 xl:w-40" />
            </div>
            <div ref={modalContainerRef} onClick={(e) => {
                if (e.target === modalContainerRef.current && modalContainerRef.current.classList.contains("flex")) {
                    toggleModal();
                }

            }} className="hidden flex-col justify-center items-center opacity-0 transitions fixed top-1/2 -translate-1/2 left-1/2 w-full h-full bg-black/50 z-50">
                <div ref={modalRef} className="scale-0 transitions bg-primary-500 h-[85vh] w-[85vw] sm:h-[75vh] sm:w-[70vw] max-w-[1000px] max-h-[600px] rounded-lg flex flex-row flex-wrap items-center justify-center p-4">
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <h3 className="text-3xl uppercase">{project.name}</h3>
                        <h4 className="bg-secondary-900 text-secondary-300 py-1">{project.type}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;