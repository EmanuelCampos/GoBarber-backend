import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

interface IRequest {
  user_id: string;
  avatar_filename: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(

    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated can change avatar.');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.savefile(avatar_filename)


    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
