export class UsersService {
  private users: any[] = [];

  async findAll() {
    return this.users;
  }

  async create(user: any) {
    this.users.push(user);
    return user;
  }
}
