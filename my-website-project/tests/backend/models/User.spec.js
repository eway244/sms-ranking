const User = require('../../src/models/User');

describe('User Model', () => {
    it('should create a user with valid data', async () => {
        const userData = {
            username: 'testuser',
            password: 'Password123!',
            phone: '12345678901',
            realName: 'Test User',
            class: 'Class A'
        };

        const user = await User.create(userData);
        expect(user).toHaveProperty('id');
        expect(user.username).toBe(userData.username);
        expect(user.phone).toBe(userData.phone);
    });

    it('should not create a user with invalid phone number', async () => {
        const userData = {
            username: 'testuser2',
            password: 'Password123!',
            phone: 'invalid_phone',
        };

        await expect(User.create(userData)).rejects.toThrow();
    });

    it('should hash the password before saving', async () => {
        const userData = {
            username: 'testuser3',
            password: 'Password123!',
            phone: '12345678902',
        };

        const user = await User.create(userData);
        expect(user.password).not.toBe(userData.password);
    });

    it('should not allow duplicate usernames', async () => {
        const userData = {
            username: 'duplicateuser',
            password: 'Password123!',
            phone: '12345678903',
        };

        await User.create(userData);
        await expect(User.create(userData)).rejects.toThrow();
    });
});