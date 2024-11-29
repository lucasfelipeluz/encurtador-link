class UserLoggedDto {
  public name: string;
  public email: string | null;
  public token: string;

  constructor(name: string, email: string | null, token: string) {
    this.name = name;
    this.email = email;
    this.token = token;
  }
}

export default UserLoggedDto;
