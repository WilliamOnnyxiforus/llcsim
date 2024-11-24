require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);

export const getUserById = async (userId) => {
    try {
        const userProfile = await db('users')
            .select('*')
            .where('users.id', userId);
        return userProfile;
    } catch (e) {
        return e;
    }
}

export const createUser = async (userData) => {
    const {id,  ...createData} = userData;
    try {
        await db('users').insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateUser = async (userData) => {
    const { id } = userData;
    try {
        await db('users')
            .where({ id })
            .update(userData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteUser = async (id) => {
    try {
        await db('users').where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getUsers = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db('users')
            .select('*')
            .whereNot('users.name', process.env.ADMIN_NAME);

        if (search) {
            query.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`)
                    .orWhere('phone', 'like', `%${search}%`)
                    .orWhere('placeOfBirth', 'like', `%${search}%`)
                    .orWhere('dateOfBirth', 'like', `%${search}%`)
                    .orWhere('address', 'like', `%${search}%`)
            });
        }

        query.orderBy(sortBy, order)
            .limit(parseInt(perPage))
            .offset(parseInt(offset))

        const users = await query;

        // Get the total count of records
        const queryTotal = db('users').count('id as count').whereNot('users.name', process.env.ADMIN_NAME);
        if (search) {
            queryTotal.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`)
                    .orWhere('phone', 'like', `%${search}%`)
                    .orWhere('placeOfBirth', 'like', `%${search}%`)
                    .orWhere('dateOfBirth', 'like', `%${search}%`)
                    .orWhere('address', 'like', `%${search}%`)
            });
        }

        const total = await queryTotal.first()

        return {
            data: users,
            meta: {
                total: total.count,
                page,
                perPage,
                totalPages: Math.ceil(total.count / perPage),
            },
        }
    }
    catch (error) {
        return error;
    }
}