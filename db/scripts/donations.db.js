require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Adjust the path as necessary

const db = knex(knexConfig.development);
const dbName = 'donations';

export const getDonationById = async (id) => {
    try {
        const data = await db(dbName)
            .join('users', 'users.id', '=', `${dbName}.userID`)
            .join('donationTypes', 'donationTypes.id', '=', `${dbName}.donationTypeID`)
            .select('donations.id as id','userID','donationTypeID' ,'users.id as userId', 'donationTypes.id as donationTypesId', 'users.name as userName', 'donationTypes.name as donationTypesName', 'remarks')
            .where('donations.id', id);
        return data;
    } catch (e) {
        return e;
    }
}

export const createDonation = async (data) => {
    const { id, ...createData } = data;
    try {
        await db(dbName).insert(createData);
        return "Success";
    }
    catch (error) {
        return error;
    }
}

export const updateDonation = async (data) => {
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

export const deleteDonation = async (id) => {
    try {
        await db(dbName).where({ id }).del();
        return "Success";
    } catch (e) {
        return e;
    }
}

export const getDonations = async ({ page, perPage, search, sortBy, order }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * perPage;

    try {
        const query = db(dbName)
            .join('users', 'users.id', '=', `${dbName}.userID`)
            .join('donationTypes', 'donationTypes.id', '=', `${dbName}.donationTypeID`)
            .select('donations.id as id', 'users.id as userId', 'donationTypes.id as donationTypesId', 'users.name as userName', 'donationTypes.name as donationTypesName', 'remarks')

        if (search) {
            query.andWhere(function () {
                this.where('remarks', 'like', `%${search}%`)
                    .orWhere('donationTypes.name', 'like', `%${search}%`)
                    .orWhere('users.name', 'like', `%${search}%`)
            });
        }

        query.orderBy(`donations.${sortBy}`, order)
            .limit(parseInt(perPage))
            .offset(parseInt(offset))
        const dataQuery = await query;

        // Get the total count of records
        const queryTotal = db(dbName).count('id as count');
        if (search) {
            queryTotal.andWhere(function () {
                this.where('remarks', 'like', `%${search}%`)
                    .orWhere('donationTypes.name', 'like', `%${search}%`)
                    .orWhere('users.name', 'like', `%${search}%`)
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