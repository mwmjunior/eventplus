import axios from "axios";

/**
 * Rota para o resurso Evento
 */
export const eventsResource = '/Evento'
/**
 * Rota para o recurso Listar Proximos Eventos
 */
export const proximoEventsResouce = '/Evento/ListarProximos'
/**
 * Rota para o recurso Tipo de Eventos
 */
export const eventsTypeResource = '/TiposEvento'

const apiPort = '7118';
const localApiUrl = `https://localhost:${apiPort}/api`;
const externaApiUrl = null;

const api= axios.create({
    baseURL: localApiUrl
});


export default api;
