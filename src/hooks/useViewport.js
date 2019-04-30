import {useState, useEffect} from 'react';

const generateViewport = () => ({
    width: window.innerWidth,
    height: window.innerHeight
});

const useViewport= () => {
    const [viewport, setViewport] = useState(generateViewport());

    useEffect(() => {
        const updateViewport = () => setViewport(generateViewport());
        window.addEventListener('resize', updateViewport);

        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    return viewport;
};

export default useViewport;
