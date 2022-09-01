import { useState } from 'react';

const UseForm = () => {
    const [form, setForm] = useState({});

    const handleChange = e => {
        const {name,value} = e.target

        setForm({
            ...form,
            [name] : value
        })
    }

    return {
        form,
        handleChange,
    }
}

export default UseForm