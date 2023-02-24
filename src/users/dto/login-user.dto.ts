export class LoginUserDto {
    fullName: string
    email: string
    token: string
    tokenType: "facebook" | "google"
}
