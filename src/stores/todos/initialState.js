const initialState = {
    data: [],
    status: "idle",  //'idle' | 'loading' | 'succeeded' | 'failed'
    statusAction: "idle",  //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export default initialState ;