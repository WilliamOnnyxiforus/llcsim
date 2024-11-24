require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);

export const getCommunityTypeById = async (communityTypeId) => {
    try {
        const communityType = await db('communityTypes')
            .select('*')
            .where('communityTypes.id', communityTypeId);
        return communityType;
    } catch (e) {
        return e;
    }
}

export const createCommunityType = async (communityTypeData) => {
    const {id, ...createData} = communityTypeData;
    try {
        await db('communityTypes').insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateCommunityType = async (communityTypeData) => {
    const { id } = communityTypeData;
    try {
        await db('communityTypes')
            .where({ id })
            .update(communityTypeData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteCommunityType = async (id) => {
    try {
        await db('communityTypes').where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getCommunityTypes = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db('communityTypes')
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
        const queryTotal = db('communityTypes').count('id as count');
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