import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { createUser, deleteUser, getOneUser, updateUser } from '../user.contoller';
import { sqlConfig } from '../../config/sql.config';

describe('User Registration', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('Account Created Successfully', async () => {
    const req = {
      body: {
        fname: 'jackson',
        lname: 'mwadia',
        CohortNo: 22,
        email: 'admin@theJitu.com',
        phoneNumber: '0723232444',
        gender: 'male',
        password: '12344324211',
      },
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('jfashedPwdkjshghgksjgkj' as never);

    const mockedInput = jest.fn().mockReturnThis(); // makes it chainable

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

    await createUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Account Created Successfully' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

jest.mock('mssql', () => ({
  connect: jest.fn(),
  request: jest.fn().mockReturnThis(),
}));

describe('deleteUser', () => {
  it('should delete user and return success message', async () => {
    const req = {
      params: { id: 'user_id_to_delete' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql.Request.prototype, 'execute').mockResolvedValue({
      rowsAffected: { toJSON: jest.fn().mockReturnValue([1]) },
    });

    await deleteUser(req, res);

    expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('user_id', mssql.VarChar, 'user_id_to_delete');
    expect(mssql.Request.prototype.execute).toHaveBeenCalledWith('deleteUser');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account deleted successfully',
    });
  });
});

jest.mock('mssql', () => ({
  connect: jest.fn(),
  request: jest.fn().mockReturnThis(),
}));

describe('updateUser', () => {
  it('should update user and return success message', async () => {
    const req = {
      params: { id: 'user_id_to_update' },
      body: {
        fname: 'ujackson',
        lname: 'UpdatedLastName',
        CohortNo: 42,
        email: 'updated.email@example.com',
        phoneNumber: '9876543210',
        gender: 'Male',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql.Request.prototype, 'execute').mockResolvedValue({
      rowsAffected: { toJSON: jest.fn().mockReturnValue([1]) },
    });

    await updateUser(req, res);

    expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('user_id', mssql.VarChar, 'user_id_to_update');
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('fname', mssql.VarChar, 'ujackson');
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('lname', mssql.VarChar, 'UpdatedLastName');
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('CohortNo', mssql.Int, 42);
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('email', mssql.VarChar, 'updated.email@example.com');
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('phoneNumber', mssql.VarChar, '9876543210');
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('gender', mssql.VarChar, 'Male');
    expect(mssql.Request.prototype.execute).toHaveBeenCalledWith('updateUser');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User Updated Successfully',
    });
  });
});

jest.mock('mssql', () => ({
  connect: jest.fn(),
  request: jest.fn().mockReturnThis(),
}));

describe('getOneUser', () => {
  it('should return the user data', async () => {
    const req = {
      params: { id: 'user_id_to_get' },
    } as Request;

    const res = {
      json: jest.fn(),
    } as Response;

    const mockUser = { /* mocked user data */ };

    // Reset mock function calls
    jest.clearAllMocks();

    jest.spyOn(mssql.Request.prototype, 'execute').mockResolvedValue({
      recordset: [mockUser],
    });

    await getOneUser(req, res);

    expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('user_id', mssql.VarChar, 'user_id_to_get');
    expect(mssql.Request.prototype.execute).toHaveBeenCalledWith('getOneUser');
    expect(res.json).toHaveBeenCalledWith({ user: [mockUser] });
  });

  it('should handle error during database operation and return error response', async () => {
    const req = {
      params: { id: 'user_id_to_get' },
    } as Request;

    const res = {
      json: jest.fn(),
    } as Response;

    // Reset mock function calls
    jest.clearAllMocks();

    jest.spyOn(mssql.Request.prototype, 'execute').mockRejectedValue(new Error('Database error'));

    await getOneUser(req, res);

    expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
    expect(mssql.Request.prototype.input).toHaveBeenCalledWith('user_id', mssql.VarChar, 'user_id_to_get');
    expect(mssql.Request.prototype.execute).toHaveBeenCalledWith('getOneUser');
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
