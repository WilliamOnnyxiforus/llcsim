require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);
const dbName = 'subjects';

export const getSubjectById = async (id) => {
    try {
        const subject = await db(dbName)
            .select('*')
            .where('subjects.id', id);
        return subject;
    } catch (e) {
        return e;
    }
}

export const createSubject = async (data) => {
    const { id, ...createData } = data;
    try {
        await db(dbName).insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateSubject = async (data) => {
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

export const deleteSubject = async (id) => {
    try {
        await db(dbName).where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getSubjects = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db(dbName)
            .select('*')

        if (search) {
            query.andWhere(function () {
                this.where('name', 'like', `%${search}%`)
                    .orWhere('grade', 'like', `%${search}%`)
                    .orWhere('category', 'like', `%${search}%`)
                    .orWhere('tag', 'like', `%${search}%`)
                    .orWhere('description', 'like', `%${search}%`)
                    .orWhere('silabus', 'like', `%${search}%`)
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
                .orWhere('grade', 'like', `%${search}%`)
                .orWhere('category', 'like', `%${search}%`)
                .orWhere('tag', 'like', `%${search}%`)
                .orWhere('description', 'like', `%${search}%`)
                .orWhere('silabus', 'like', `%${search}%`)
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