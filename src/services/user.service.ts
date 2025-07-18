import { userRepository } from "../app";
import { User } from "../entities/user.entity";
import { GenericService } from "./generic.service";

class UserService extends GenericService<User> {
  constructor() {
    super(userRepository);
  }

  // Add user-specific methods here
}

export default new UserService();