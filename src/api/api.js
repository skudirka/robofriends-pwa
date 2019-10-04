
import axios from 'axios';

export const apiCall = (link) => axios.get(link).then(response => response);