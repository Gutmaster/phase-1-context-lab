const createEmployeeRecord = function(infoArray){
    return{
        'firstName': infoArray[0],
        'familyName': infoArray[1],
        'title': infoArray[2],
        'payPerHour': infoArray[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

const createEmployeeRecords = function(infoRecords){
    return infoRecords.map(function(e){
        return createEmployeeRecord(e)
    })
}

const createTimeInEvent = function(dateStamp){
    const splitDate = dateStamp.split(' ')
    this.timeInEvents.push({
        'type':'TimeIn',
        'hour': Number(splitDate[1]),
        'date': splitDate[0]
    })
    return this 
}

const createTimeOutEvent = function(dateStamp){
    const splitDate = dateStamp.split(' ')
    this.timeOutEvents.push({
        'type':'TimeOut',
        'hour': Number(splitDate[1]),
        'date': splitDate[0]
    })
    return this 
}

const hoursWorkedOnDate = function(date){
    const hourIn = this.timeInEvents.reduce(function(hour, e){
        return e.date === date ? e.hour : hour
    }, 0)
    const hourOut = this.timeOutEvents.reduce(function(hour, e){
        return e.date === date ? e.hour : hour
    }, 0)
    return Math.round(hourOut - hourIn)/100
}

const wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date)*this.payPerHour
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function findEmployeeByFirstName(records, name){
    return records.reduce(function(target, e){
        return e.firstName === name ? e : target
    }, undefined)
}

const calculatePayroll = function(records){
    return records.reduce(function(wageSum, r){
        return wageSum + allWagesFor.call(r)
    }, 0)
}