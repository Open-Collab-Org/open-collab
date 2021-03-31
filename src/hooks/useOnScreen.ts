import { useState, useEffect, MutableRefObject } from 'react';

const useOnScreen = (ref: MutableRefObject<any>) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
};

export default useOnScreen;
