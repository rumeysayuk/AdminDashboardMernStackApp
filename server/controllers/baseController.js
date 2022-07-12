const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")
const mongoose = require("mongoose")

const create = asyncErrorWrapper(async (req, res, next) => {
   let {service} = req.params
   let user = req.user
   try {
      service = require("../models/" + service)
   } catch (e) {
      return next(new CustomError("Wrong service name", 400))
   }
   let {data} = req.body
   if (!data) return next(new CustomError("Please send the record to be added with the data name ..!", 400))
   let createdData = await service.create({...data, createdBy: user._id})
   return res.status(200).json({data: createdData, success: true})
})

const update = asyncErrorWrapper(async (req, res, next) => {
   let {service, id} = req.params
   let user = req.user
   try {
      service = require("../models/" + service)
   } catch (e) {
      return next(new CustomError("Wrong service name", 400))
   }
   let {data} = req.body
   if (!data) return next(new CustomError("Please send the record to be added with the data name ..!", 400))
   if (!id || !mongoose.Types.ObjectId.isValid(id)) return next(new CustomError("Invalid id! ", 400))
   await service.updateOne({_id: id}, {$set: {...data, updatedBy: user._id}}).then(data => {
      return res.status(200).json({success: true})
   }).catch(err => {
      return next(new CustomError("Failed to update"))
   })
   let createdData = await service.create({...data, createdBy: user._id})
   return res.status(200).json({data: createdData, success: true})
})

const deleteData = asyncErrorWrapper(async (req, res, next) => {
   let {service, id} = req.params
   const user = req.user
   try {
      service = require("../models/" + service)
   } catch (e) {
      return next(new CustomError("Wrong service name !", 400))
   }
   if (!id || !mongoose.Types.ObjectId.isValid(id)) return next(new CustomError("Wrong id !", 400))
   // await service.deleteOne({_id: id})
   // return res.status(200).json({data: id, success: true})
   let updated = await service.findById(id)
   if (updated) {
      updated.deleted = true
      updated.deletedBy = user._id
      await updated.save()
      return res.status(200).json({data: id, success: true})
   } else {
      return next(new CustomError("Bu id'ye ait kayıt bulunamadı", 400))
   }
})

const getAll = asyncErrorWrapper(async (req, res, next) => {
   let {service} = req.params
   try {
      service = require("../models/" + service)
   } catch (e) {
      return next(new CustomError("Wrong service name!", 400))
   }
   let list = await service.find({deleted: false, ...req.query})
   return res.status(200).json({data: (list || []), success: true})
})

const getById = asyncErrorWrapper(async (req, res, next) => {
   let {service, id} = req.params
   try {
      service = require("../models/" + service)
   } catch (e) {
      return next(new CustomError("Wrong service name!", 400))
   }
   if (!id || !mongoose.Types.ObjectId.isValid(id)) return next(new CustomError("Invalid id", 400))
   let record = await service.findById(id)
   return res.status(200).json({data: record, success: true})
})

module.exports = {create, update, deleteData, getAll, getById}