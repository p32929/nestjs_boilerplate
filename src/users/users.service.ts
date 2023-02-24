import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenVerifier } from 'src/utils/TokenVerifier';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) { }

  async login(loginUserDto: LoginUserDto) {
    const { token, tokenType } = loginUserDto;
    var isVerified = false
    var accessToken = null

    if (tokenType == 'facebook') {
      isVerified = await TokenVerifier.verifyFacebookToken(token)
    }
    else if (tokenType == 'google') {
      isVerified = await TokenVerifier.verifyGoogleToken(token);
    }

    console.log(`isVerified: ${isVerified}`);

    if (isVerified) {
      const { email, fullName } = loginUserDto;

      console.log(`emai: ${email}`)
      console.log(`fullName: ${fullName}`)

      await this.userModel.findOneAndUpdate({ email: email }, { $set: loginUserDto }, { upsert: true, new: true });
      accessToken = this.jwtService.sign(loginUserDto)
    }

    return {
      access_token: accessToken
    };
  }
}
