import { useEffect, useRef, useState } from 'react';

export default function useField(values=[]) {
    const numberList = useRef(values);
    const [output, setOutput] = useState("");
    const field = output;
    const fields = numberList.current;
    
    useEffect(() => {
        toOutput();
    }, [values]);

    const toOutput = () => {
        const value = numberList.current.join("");
        setOutput(value);
    };

    const setField = (inputs=[]) => {
        numberList.current = inputs;
        toOutput();
    };

    return [field, fields, setField];
}