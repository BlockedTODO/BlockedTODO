import {useEffect, useRef, useState} from 'react';

const useOutsideCloseable = (initialValue = false) => {
    const [isVisible, setIsVisible] = useState(initialValue);
    const ref = useRef(null);

    const onOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false);
        }
    };

    const onEscapeKey = (e) => {
        if (e.keyCode === 27) {
            setIsVisible(false);
        }
    };

    const onBlur = (e) => {
        // Inspired by https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
        const currentTarget = e.currentTarget;

        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setIsVisible(false);
            }
        }, 0);
    };

    useEffect(() => {
        document.addEventListener('mouseup', onOutsideClick);

        return () => {
            document.removeEventListener('mouseup', onOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Only activate the event listener when the element becomes visible
            // Otherwise, it'll fire for every instance of ESC, for every instance of useOutsideCloseable
            document.addEventListener('keydown', onEscapeKey);
        } else {
            document.removeEventListener('keydown', onEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', onEscapeKey);
        };
    }, [isVisible]);

    const closeableContainerProps = {ref, onBlur};

    return {closeableContainerProps, isVisible, setIsVisible};
};

export default useOutsideCloseable;
