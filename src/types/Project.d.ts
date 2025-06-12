type ProjectType = {
    id: string;
    name: string;
    type: string;
    tools: string[];
    skills: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    description: string;
    url: string | undefined;
};

export default ProjectType;
