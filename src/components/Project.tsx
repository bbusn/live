import { useAuth } from "../hooks/useAuth";
import { ProjectType } from "../hooks/useAuth";

const Project = (project: ProjectType) => {
    const { assets } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center bg-primary-300 p-2.5 h-max w-max">
            <img src={assets?.images[project.id].src} className="w-36 xl:w-40" />
        </div>
    );
}

export default Project;