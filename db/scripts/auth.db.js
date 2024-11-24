import { getUserById } from './users.db.js';

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const db = knex(knexConfig.development);

export const checkUsername = async (username) => {
    try {
        const results = await db('employees')
            .select('employees.isNewPassword', 'employees.isBlocked')
            .where('employees.username', username);
        //console.log(results)
        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const login = async (username, password) => {
    const isNewPassword = checkUsername(username);

    try {
        const userData = await db('employees')
            .select('employees.password', 'employees.userID')
            .where('employees.username', username);
        //console.log(userData);
        const isMatch = await bcrypt.compare(password, userData[0]['password']);
        //console.log(isMatch);

        if (isMatch) {
            const userProfile = await getUserById(userData[0]['userID']);
            console.log(userProfile);
            return userProfile;
        }
        else {
            return [];
        }

        //return password;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const blockAccount = async (username) => {
    try {
        const results = await db('employees')
            .where({ username })
            .update({
                isBlocked: 1,  // Set new value for email
            });
        return 'Data has been updated';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}