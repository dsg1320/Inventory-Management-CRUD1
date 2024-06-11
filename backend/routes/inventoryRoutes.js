const express = require('express');
const { getProducts, getproductbycategory, getSupplier, getOrder, getorderByPrice, getorderByQuantity, deleteprodbyid, deletesupplybyid, deleteorderbyid, exportToExcel, updateproduct, updatesupplier, updateorders, getproductbyPrice, insertOrder, insertsupplier, insertproduct, getproductbyID, getorderbyID, getsupplierbyID } = require('../controllers/inventoryController');

//router object
const router = express.Router();

//routes

//GET ALL PRODUCT LIST || GET
router.get('/getall', getProducts);
router.get('/get/product/category/:category', getproductbycategory)
router.get('/getallsupplier', getSupplier)
router.get('/getorders', getOrder)
router.get('/get/price/:total_price', getorderByPrice)
router.get('/get/quantity/:quantity', getorderByQuantity)
router.get('/get/product/price/:price',getproductbyPrice)
router.delete('/delete/:id', deleteprodbyid)
router.delete('/delete/supplier/:id', deletesupplybyid)
router.delete('/delete/order/:id',deleteorderbyid)
router.post('/exportall',exportToExcel)
router.put('/update/:id',updateproduct)
router.put('/update/supplier/:id',updatesupplier)
router.put('/update/orders/:id',updateorders)
router.post('/order/insert', insertOrder)
router.post('/supplier/insert',insertsupplier)
router.post('/insert_product',insertproduct)
router.get('/getall/:id',getproductbyID)
router.get('/getorder/:id',getorderbyID)
router.get('/getsupplier/:id',getsupplierbyID)


module.exports = router;