import React from 'react';
import { useRouter } from 'next/router';
import NewProject from '@layouts/NewProject';
import Error from '@layouts/Error';
import Project from '@components/Project';

const ProjectHandler = () => {
    const router = useRouter();

    // /projects is redirected to / from the redirects defined in the next.config.js
    const action = (router.query.action as string[]) || [];

    if (action[0] === 'new') {
        return <NewProject action={action.slice(1, action.length)} />;
    }

    if (!isNaN(Number(action[0]))) {
        return <Project id={Number(action[0])} />;
    }

    /*
     * Since during the render process action[0] is undefined, make sure
     * it has properly loaded before rendering the erro page. Without this validation
     * even when navigating to a valid location, like /projects/new, the error page flashes
     */
    return action.length ? <Error code={404} /> : <div />;
};

export default ProjectHandler;
