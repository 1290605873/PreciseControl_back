import axios from './api'
import urlConfig from './apiServerConfig'
/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// get 示例
export const get = () => {
    return axios({
        url: '/query',
        method: 'get'
    })
};

//post 示例
export const post = data => {
    return axios({
        url: '/upload',
        method: 'post',
        data
    })
};

/**
 * 获取表单列表
 */
export const getFormList = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/form/form-type!formList.action',
        method: 'post',
        params
    })
};


/**
* 获取组织列表
*/
export const getOrgList = params => {
    let origin = urlConfig.tepBase.split("//")[0] + '//'
    if(process.env.NODE_ENV =='development'){
        origin = "https://api.iuoooo.com"
    }else{
        origin += urlConfig.tepBase.indexOf('test') > -1 ? 'testapi.iuoooo.com' : 'api.iuoooo.com'
    }
    return axios({
    url:urlConfig.tepBase + '/jc6/form/form-type!forwardEBCorg.action',
    method: 'post',
    params:{
      url: origin + '/ebc.api/Jinher.AMP.EBC.SV.EmployeeQuerySV.svc/SearchOrgByName',
      ...params
    }
  })
}

/**
 * 获取Appid表单列表(公用转接口)
 */
export const getcrossDomain= params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/api/special/crossDomain.json',
        method: 'post',
        data:params
    })
};
export const getInputFormAmount = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/JHSoft.WCF/formdata/getInputFormAmount',
        method: 'post',
        data:params
    })
};
export const operateDatabase = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/JHSoft.WCF/formdata/operateFormData',
        method: 'post',
        data: params
    });
};
export const getFormInfos = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/JHSoft.WCF/formdata/getFormRanking',
        method: 'post',
        data: params
    });
}
//标签列表
export const tableLabelList = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/label/table-label!tableLabelList.action',
        method: 'post',
        params
    });
}
//标签保存
export const saveTableLabel = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/label/table-label!saveTableLabel.action',
        method: 'post',
        params
    });
}
//标签删除
export const tableLabelDeletes = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/label/table-label!deletes.action',
        method: 'post',
        data: params
    });
}
//获取标签设置
export const getTableLabelIds = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/label/table-label!getTableLabelIds.action',
        method: 'post',
        data: params
    });
}
//保存标签设置
export const setTableLabel = params => {
    return axios({
        url: urlConfig.tepBase + '/jc6/label/table-label!setTableLabel.action',
        method: 'post',
        data: params
    });
}
// 默认全部导出
export default {
    get,
    post,
    getFormList,
    getOrgList,
    getcrossDomain,
    getInputFormAmount,
    operateDatabase,
    getFormInfos,
    tableLabelList,
    saveTableLabel,
    tableLabelDeletes,
    getTableLabelIds,
    setTableLabel
}
