export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly name: string;
  readonly role: string[];
}
