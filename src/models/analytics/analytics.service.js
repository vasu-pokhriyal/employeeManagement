import {ObjectId} from 'mongodb'
import projectFacade from '../project/project.facade'
import projectTaskFacade from '../projectTask/projectTask.facade'
import accuracyHelper from '../../utils/helpers'


export default {
    overallPerformance: async function (data) {
  //  let underTimelineProject = await projectFacade.count({ $expr : { $lte :["$projectLengthActual","$projectLengthEstimate"]}});
    let underTimelineProject = await projectFacade.analytics({ $expr : { $lte :["$projectLengthActual","$projectLengthEstimate"]}})
    // let totalProject =    await projectFacade.count({}); 
    // let overallPerformance = ((underTimelineProject*100)/totalProject).toFixed(2) //using overall performance formula
    let result = underTimelineProject[0]?underTimelineProject[0]['percentage'] :0
    return result;
},
    projectPerformance: async function (projectId) {
        console.log(projectId)
        let projectPerformance = await projectTaskFacade.analytics(
            { $expr : { $lte :["$actualHours","$estimatedHours"]},"projectId":ObjectId(projectId)},
            {"projectId":ObjectId(projectId)});
        // let totalTask =    await projectTaskFacade.count({"projectId":ObjectId(projectId)}); 
        // let overallPerformance = ((underTimelineTask*100)/totalTask).toFixed(2) //using overall performance formula
        let result = projectPerformance[0]?projectPerformance[0]['percentage'] :0
    return result;
    },
    overallAccuracy: async function () {
        let result =  await projectFacade.analyticsOverallAccuracy();
        let overallAccuracy = result[0]?result[0]['avg']:0
        return accuracyHelper.getAccuracyPercentage(overallAccuracy);
    },
    projectAccuracy: async function (projectId) {
       
        let result =  await projectFacade.findOne({_id:ObjectId(projectId)},{"numberOfBugs":1})
        let projectAccuracy = result.numberOfBugs;
        console.log(projectAccuracy);
        return accuracyHelper.getAccuracyPercentage(projectAccuracy);
    }
}