import axios from "axios";


export const createEvent = (datos) => {
    return async () => {
        return axios.post(`${axios.defaults.baseURL}/events/create`, datos)
            .then(res => res.data)
            .then(data => {
                console.log(data, 'creado con exito');
            })
    }
}

export const updateEvent = (id, datos) => {
    return async (dispatch) => {
        return axios
            .put(`${axios.defaults.baseURL}/events/update/${id}`, datos)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            });
    };
};

export const deleteEvent = (id, datos) => {
    return async (dispatch) => {
        return axios
            .delete(`${axios.defaults.baseURL}/events/delete/${id}`, datos)
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
            });
    };
};