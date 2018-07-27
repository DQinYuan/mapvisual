let utils = {
    _oneday : 86400000       //一天有86400000毫秒
}

utils.date2string = function(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + "年" + month + "月" + day + "日";
}

utils.string2date = function(string){
    let year_ind = string.indexOf("年");
    let month_ind = string.indexOf("月");
    let day_ind = string.indexOf("日");
    let year = parseInt(string.substring(0, year_ind));
    let month = parseInt(string.substring(year_ind + 1, month_ind)) - 1;
    let day = parseInt(string.substring(month_ind + 1, day_ind));
    return new Date(year, month, day, 0, 0, 0, 0);
}

utils.upgradeDate = function(date){
    date.setTime(date.valueOf() + this._oneday);
}

utils.upgradeDateByYear = function(date){
    return new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
}

utils.upgradeDateByMonth = function(date){
    //利用js的Date超过12个月会自动更新年份的特性
    return new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
}

utils.upgradeDateByQuarter = function(date){
    //利用js的Date超过12个月会自动更新年份的特性
    return new Date(date.getFullYear(), date.getMonth() + 4, 1, 0, 0, 0, 0);
}

export default utils;