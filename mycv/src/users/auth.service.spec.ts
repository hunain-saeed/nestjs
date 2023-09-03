import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      // find: () => Promise.resolve([]),
      // create: (email: string, password) =>
      //   Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('sould be defined', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sign up with email that is in use', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'asdf@asdf.com', password: 'asdf' } as User,
    //   ]);
    await service.signup('asdf@asdf.com', 'asdf');

    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      new BadRequestException('Email is in user'),
    );
  });

  it('throws an error if signin is called with an unused email', async () => {
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('throws an error if invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'asdf@asdf.com', password: 'asdf' } as User,
    //   ]);

    await service.signup('asdf@asdf.com', 'asdf');

    await expect(service.signin('asdf@asdf.com', '123')).rejects.toThrow(
      new BadRequestException('Bad password'),
    );

    // try {
    //   await service.signin('asdf@asdf.com', '123');
    // } catch (error) {
    //   done(); // also add done in parameter of async method
    // }
  });

  it('return user if email and password are correct', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'asdf@asdf.com', password: '8e9320dfd94433cb.954d6c49b0ffd95a691e50ba7ed517bde6c85cf00875d46edb24e00c70a50d68' } as User,
    //   ]);
    await service.signup('asdf@asdf.com', 'asdf');

    const user = await service.signin('asdf@asdf.com', 'asdf');
    expect(user).toBeDefined();
  });
});
