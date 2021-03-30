export interface IProject {
    /**
     * The display name of the project
     */
    name: string;

    /**
     * Array of tags associated with this project
     */
    tags: string[];

    /**
     * Array of skills needed for the project
     */
    skills: string[];

    /**
     * A brief description of the project
     */
    shortDescription: string;

    /**
     * A UID for the project to be used in the URL
     */
    id: number;

    /**
     * The URL that points to this project
     */
    url: string;
}
