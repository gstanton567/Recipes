import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConfigService {

  constructor() { }

  dateToDateTimeString(date: Date) {
    let tempDate = new Date(date)
    let tempString = ""
    tempString += tempDate.getFullYear() + "-" 
    let month = (tempDate.getMonth() + 1) + "-" 
    if (month.length <=2) {
      month = "0" + month
    }
    let day = tempDate.getDate() + "" 
    if (day.length <=1) {
      day = "0" + day
    }
    tempString += month + day
    return tempString
    
  }

  getMonthYearString(tempDate: Date) {
    let tempString = ""
    tempString += tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1)
    return tempString
  }

  getMonthNumFromName(dateString: string) {

    let tempArr = dateString.split(" ")
    let tempString = tempArr[0]
    console.log(tempString)
    switch(tempString) {
      case "January":  {
       return 1 
      }
      case "February":  {
        return 2 
       }
       case "March":  {
        return 3 
       }
       case "April":  {
        return 4 
       }
       case "May":  {
        return 5 
       }
       case "June":  {
        return 6 
       }
       case "July":  {
        return 7 
       }
       case "August":  {
        return 8 
       }
       case "September":  {
        return 9 
       }
       case "October":  {
        return 10 
       }
       case "November":  {
        return 11 
       }
       case "December":  {
        return 12 
       }

      default: {
        return -1
      }
    }
  }
}
