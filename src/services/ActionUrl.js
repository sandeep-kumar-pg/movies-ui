import http from "../http-common";

class ActionUrlService {

  getAll() {
    return http.get("/movies");
  }

  get(imdbID) {
    return http.get(`/movies/${imdbID}`);
  }

  findByTitle(title) {
    return http.get(`/movies?Title=${title}`);
  }

}

export default new ActionUrlService();
