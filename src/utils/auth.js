class Auth {
    constructor(options) {
      this.options = options;
      this.baseUrl = this.options.baseUrl;
      this.headers = this.options.headers;
    }
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    register({email, password}) {
      return fetch(`${this.baseUrl}/signup`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkStatus(res));
    }
    authorization({email, password}) {
        return fetch(`${this.baseUrl}/signin`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({ email, password }),
        }).then((res) => this._checkStatus(res));
      }
    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        }).then((res) => this._checkStatus(res));
      }
  }
  
  export const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  