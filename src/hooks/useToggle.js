import { useState } from "react";

function useToggle(initValue) {
    const [value, setValue] = useState(initValue);

    const toggle = () => {
        setValue(!value);
    }

    return [value, toggle];
}

export {useToggle};