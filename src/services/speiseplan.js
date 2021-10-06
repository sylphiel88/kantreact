import http from "../http-common.js"

class SpeiseplanService {
    getAll() {
        return http.get('/');
    }
}

export default new SpeiseplanService()
