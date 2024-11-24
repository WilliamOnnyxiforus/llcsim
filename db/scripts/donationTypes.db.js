require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);

export const getDonationTypeById = async (donationTypeId) => {
    try {
        const donationType = await db('donationTypes')
            .select('*')
            .where('donationTypes.id', donationTypeId);
        return donationType;
    } catch (e) {
        return e;
    }
}

export const createDonationType = async (donationTypeData) => {
    const {id, ...createData} = donationTypeData;
    try {
        await db('donationTypes').insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateDonationType = async (donationTypeData) => {
    const { id } = donationTypeData;
    try {
        await db('donationTypes')
            .where({ id })
            .update(donationTypeData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const deleteDonationType = async (id) => {
    try {
        await db('donationTypes').where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getDonationTypes = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db('donationTypes')
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
        const queryTotal = db('donationTypes').count('id as count');
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