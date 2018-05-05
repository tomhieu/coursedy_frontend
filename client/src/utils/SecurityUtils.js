import * as WebConstants from "constants/WebConstants";

export class SecurityUtils {
  static isAuthenticated() {
    return localStorage.getItem(WebConstants.AUTHENTICATED) != null;
  }
}