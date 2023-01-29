import dbClient from '../../connection/mongodb'
import helpers from '../../utils/helpers'
import projectTask from './projectTask.model'

export default {

    findOne: async function (filter) {
        return await projectTask.findOne(filter)
    },
    create: async function (data) {
        return await projectTask.create(data)

    },

    update: async function (userId, updateEntry) {

        return await projectTask.findOneAndUpdate(userId, updateEntry, { returnOriginal: false })
    },
    find: async function (filter, options = {}) {
        const { sort, limit, skip } = helpers.getFindParams(options);
        return projectTask.find(filter).sort(sort).skip(skip).limit(limit)
    },
    count: async function (filter) {
        filter = { isDeleted: false, ...filter }
        return projectTask.count(filter)
    },

    analytics: async function (filterForLessThanOrEqualToHours, filterForProjectId) {
       let filter = { isDeleted: false, ...filterForLessThanOrEqualToHours }
        return projectTask.aggregate([
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
                            $match: {isDeleted:false,...filterForProjectId}
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

    }
}