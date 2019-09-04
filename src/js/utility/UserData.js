import Ranking from './Ranking';

export default class UserData {
  constructor(userId = '', objectId = '', userName = '', email = '', age = 10, gender = 1, pontaId = '', otherId = '', currentPoint = 0, 
    totalPoint = 0, rankType = 10, vehicleModelId = 0, vehicleNumber = '', emailVerified = false, ranking = new Ranking(0,0), points = [], pointExchangeHistories = []) {
    this.userId = userId;
    this.objectId = objectId;
    this.userName = userName;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.pontaId = pontaId;
    this.otherId = otherId;
    this.currentPoint = currentPoint;
    this.totalPoint = totalPoint;
    this.rankType = rankType;
    this.vehicleModelId = vehicleModelId;
    this.vehicleNumber = vehicleNumber;
    this.emailVerified = emailVerified;
    this.ranking = ranking;
    this.points = points;
    this.pointExchangeHistories = pointExchangeHistories;
  }

  getObject() {
    return {
      userId : this.userId,
      objectId : this.objectId,
      userName : this.userName,
      email : this.email,
      age : this.age,
      gender : this.gender,
      pontaId : this.pontaId,
      otherId : this.otherId,
      currentPoint : this.currentPoint,
      totalPoint : this.totalPoint,
      rankType : this.rankType,
      vehicleModelId : this.vehicleModelId,
      vehicleNumber : this.vehicleNumber,
      emailVerified : this.emailVerified,
      ranking : this.ranking,
      points : this.points,
      pointExchangeHistories : this.pointExchangeHistories,
    };
  }
}