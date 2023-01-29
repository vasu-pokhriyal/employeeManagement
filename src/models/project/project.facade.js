import dbClient from '../../connection/mongodb'
import helpers from '../../utils/helpers'
import project from './project.model'

export default {

    findOne: async function (filter) {
        return await project.findOne(filter)
    },
    create: async function (data) {
        return await project.create(data)

    },

    update: async function (userId, updateEntry) {

        return await project.findOneAndUpdate(userId, updateEntry, { returnOriginal: false })
    },
    find: async function (filter, options = {}) {
        const { sort, limit, skip } = helpers.getFindParams(options);
        return project.find(filter).sort(sort).skip(skip).limit(limit)
    },

    count: async function (filter) {
        filter = { isDeleted: false, ...filter }
        return project.count(filter)
    },
    analytics: async function (filterForLessThanOrEqualToHours) {
        let filter = { isDeleted: false, ...filterForLessThanOrEqualToHours }
        return project.aggregate([
            {
                $facet: {
                    matchCount: [
                        {
                            $match: filter
                        },
                        {
                            $count: "count"
                        }
                    ],
                    totalCount: [
                        {
                            $match: { isDeleted: false }
                        },

                        {
                            $count: "total"
                        }
                    ]
                }
            },
            {
                $project: {
                    percentage: {
                        $multiply: [
                            {
                                $divide: [
                                    { $arrayElemAt: ["$matchCount.count", 0] },
                                    { $arrayElemAt: ["$totalCount.total", 0] }
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ])

    },

    analyticsOverallAccuracy: async function (filterForLessThanOrEqualToHours) {
        let filter = { isDeleted: false, ...filterForLessThanOrEqualToHours }
        return project.aggregate([
            {
                $match: {
                    "isDeleted": false
                }
            },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$numberOfBugs" }
                }
            }
        ]);
    }


}