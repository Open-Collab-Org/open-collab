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
     * The UUID of this project
     */
    id: string;

    /**
     * The URL that points to this project
     */
    url: string;
}
