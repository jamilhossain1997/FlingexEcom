import { useEffect } from 'react';

function FacebookPixel() {
    useEffect(() => {
        window.fbq('track', 'PageView');
        console.log(window.fbq('track', 'PageView'))
    }, []);

    return null;
}

export default FacebookPixel;
