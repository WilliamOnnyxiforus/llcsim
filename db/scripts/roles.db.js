require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);
const dbName = 'roles';

export const getRoleById = async (id) => {
    try {
        const data = await db(dbName)
            .select('*')
            .where('roles.id', id);
        return data;
    } catch (e) {
        return e;
    }
}

export const createRole = async (data) => {
    const { id, ...createData } = data;
    try {
        await db(dbName).insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateRole = async (data) => {
    const { id } = data;
    try {
        await db(dbName)
            .where({ id })
            .update(data);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteRole = async (id) => {
    try {
        await db(dbName).where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getRoles = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db(dbName)
            .select('*')

        if (search) {
            query.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                    .orWhere('description', 'like', `%${search}%`)
                    .orWhere('requirements', 'like', `%${search}%`)
            });
        }

        query.orderBy(sortBy, order)
            .limit(parseInt(perPage))
            .offset(parseInt(offset))

        const dataQuery = await query;

        // Get the total count of records
        const queryTotal = db(dbName).count('id as count');
        if (search) {
            queryTotal.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                .orWhere('description', 'like', `%${search}%`)
                .orWhere('requirements', 'like', `%${search}%`)
            });
        }

        const total = await queryTotal.first()

        return {
            data: dataQuery,
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