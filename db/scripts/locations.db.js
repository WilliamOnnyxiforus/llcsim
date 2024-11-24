require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);

export const getLocationById = async (id) => {
    try {
        const location = await db('locations')
            .select('*')
            .where('locations.id', id);
        return location;
    } catch (e) {
        return e;
    }
}

export const createLocation = async (data) => {
    const { id, ...createData } = data;
    try {
        await db('locations').insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateLocation = async (data) => {
    const { id } = data;
    try {
        await db('locations')
            .where({ id })
            .update(data);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteLocation = async (id) => {
    try {
        await db('locations').where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getLocations = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db('locations')
            .select('*')

        if (search) {
            query.andWhere(function () {
                this.where('address', 'like', `%${search}%`)
                    .orWhere('city', 'like', `%${search}%`)
                    .orWhere('remarks', 'like', `%${search}%`)
            });
        }

        query.orderBy(sortBy, order)
            .limit(parseInt(perPage))
            .offset(parseInt(offset))

        const dataQuery = await query;

        // Get the total count of records
        const queryTotal = db('locations').count('id as count');
        if (search) {
            queryTotal.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                .orWhere('city', 'like', `%${search}%`)
                .orWhere('remarks', 'like', `%${search}%`)
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