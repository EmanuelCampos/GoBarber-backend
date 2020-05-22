import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass} from 'class-transformer'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { filename: avatar_filename } = request.file;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id,
      avatar_filename,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
