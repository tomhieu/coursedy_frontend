import * as WebConstants from "constants/WebConstants";
import {UserRole} from "../constants/UserRole";

export class SecurityUtils {
  static isAuthenticated() {
    return localStorage.getItem(WebConstants.AUTHENTICATED) != null;
  }

  static isAdmin(user) {
    if (!user || !Array.isArray(user.roles)) {
      return false;
    }
    return user.roles.indexOf(UserRole.ADMIN) >= 0;
  }

  static isTeacher(user) {
    if (!user || !Array.isArray(user.roles)) {
      return false;
    }
    return user.roles.indexOf(UserRole.TEACHER) >= 0;
  }

  static isStudent(user) {
    if (!user || !Array.isArray(user.roles)) {
      return false;
    }
    return user.roles.indexOf(UserRole.STUDENT) >= 0;
  }
}