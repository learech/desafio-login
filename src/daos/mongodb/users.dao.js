import { getRandomDate, getRandomNumber } from '../../path.js';
import { UserModel } from "./models/users.model.js";

export default class UserDaoMongoDB {

  async getUserByName(name) {
    try {
      const response = await UserModel.find({first_name: name})//.explain();//explain es un metodo de mongoose para ver la info de esta consulta
      return response//.executionStats;        
    } catch (error) {
      console.log(error);
    }
  }


  async getUserByEmail(email) {
    try {
      const response = await UserModel.find({ email: email })//.explain()
      return response//.executionStats;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await UserModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //con email corroboramos que el usuario no existe
  async createUser(user) {
    try {
      const { email, password } = user;
      const existUser = await UserModel.find({email});
      if (existUser.length === 0){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder'){
          return await UserModel.create({ ...user, role: 'admin'});
        } else {
          const newUser = await UserModel.create(user);
          return newUser
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email, password });
      if(userExist) {
        return userExist;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
  
  async updateUser(id, obj) {
    try {
      await UserModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteUser(id) {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateManyUsers() {
    try {
      const users = await UserModel.find({});
      users.forEach((user)=>{
        user.age = getRandomNumber()
        user.date = getRandomDate()
        user.save()
      })
      return { message: 'update ok' }
    } catch (error) {
      console.log(error);
    }
  }

  // async aggregation1() {
  //   try {
  //     const response = await UserModel.aggregate([
  //       //stage
  //       {
  //         $match: {
  //           // gender: `${ gender }`,
  //           age: { $gte: 18 }
  //         }
  //       },
  //       {
  //         $group: {
  //           _id: '$gender',
  //           average_age: { $avg: '$age'},
  //           count: { $sum: 1 },
  //           youngest: { $min: '$age' },
  //           oldest: { $max: '$age' }
  //         }
  //       },
  //       {
  //         $sort: {
  //           average_age: -1 //1 asc - -1 desc
  //         }
  //       }
  //     ])
  //       return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}