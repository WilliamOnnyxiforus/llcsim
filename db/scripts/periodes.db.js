require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);
const dbName = 'periodes';

export const getPeriodeById = async (id) => {
    try {
        const periode = await db(dbName)
            .select('*')
            .where('periodes.id', id);
        return periode;
    } catch (e) {
        return e;
    }
}

export const createPeriode = async (data) => {
    const { id, ...createData } = data;
    try {
        await db(dbName).insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updatePeriode = async (data) => {
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

export const deletePeriode = async (id) => {
    try {
        await db(dbName).where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getPeriodes = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db(dbName)
            .select('*')

        if (search) {
            query.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                    .orWhere('startDate', 'like', `%${search}%`)
                    .orWhere('endDate', 'like', `%${search}%`)
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
                .orWhere('startDate', 'like', `%${search}%`)
                .orWhere('endDate', 'like', `%${search}%`)
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