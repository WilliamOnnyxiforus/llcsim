require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);

export const getClassTypeById = async (classTypeId) => {
    try {
        const classType = await db('classTypes')
            .select('*')
            .where('classTypes.id', classTypeId);
        return classType;
    } catch (e) {
        return e;
    }
}

export const createClassType = async (classTypeData) => {
    const {id, ...createData} = classTypeData;
    try {
        await db('classTypes').insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateClassType = async (classTypeData) => {
    const { id } = classTypeData;
    try {
        await db('classTypes')
            .where({ id })
            .update(classTypeData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteClassType = async (id) => {
    try {
        await db('classTypes').where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getClassTypes = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db('classTypes')
            .select('*')

        if (search) {
            query.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
            });
        }

        query.orderBy(sortBy, order)
            .limit(parseInt(perPage))
            .offset(parseInt(offset))

        const dataQuery = await query;

        // Get the total count of records
        const queryTotal = db('classTypes').count('id as count');
        if (search) {
            queryTotal.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
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