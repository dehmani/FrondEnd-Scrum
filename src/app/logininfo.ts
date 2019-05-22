export class signup {
constructor(
  public username?: string,
  public firstname?: string,
  public lastname?: string,
  public email?: string,
  public phone?: string,
  public password?: string,
  public role?: string,
){}
}

export class Login {
  constructor(
    public _username?: string,
    public _password?: string,
  ){}
}