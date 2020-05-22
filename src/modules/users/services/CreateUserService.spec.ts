import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider:  FakeCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
     fakeUsersRepository,
     fakeHashProvider,
     fakeCacheProvider
   );
  })

  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Teste');
    expect(user.email).toBe('teste@teste.com.br');
  });

  it('should not be able to create a new user with same email from another', async () => {

    await createUser.execute({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Teste',
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
