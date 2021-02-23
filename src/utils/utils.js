
module.exports.isDateSame = (d1, d2, scope) => {
    if (!["year","month","day","hour","minute","second","millisecond"].includes(scope))
        throw new Error("Invalid scope");
    const dateFunctions = [
        { name: "year", func: "getFullYear" },
        { name: "month", func: "getMonth" },
        { name: "day", func: "getDate" },
        { name: "hour", func: "getHours" },
        { name: "minute", func: "getMinutes" },
        { name: "second", func: "getSeconds" },
        { name: "millisecond", func: "getMilliseconds" }
    ];
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    for (let { name, func } of dateFunctions) {
        if (date1[func]() !== date2[func]())
            return false;
        if (scope === name)
            break;
    }
    return true;
};

module.exports.getLocalDateTime = () => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};
